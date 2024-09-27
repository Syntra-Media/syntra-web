import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/utils/rateLimit';
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/EmailTemplate";
import createClient from '@/utils/supabaseServer';

const resend = new Resend(process.env.RESEND_API_KEY);

const getLimit = rateLimit(10, 3600000) // 10 requests per hour
const postLimit = rateLimit(1, 86400000) // 1 requests per day

// In-memory cache for meetings
let meetingsCache: { [email: string]: boolean } = {};

const GetMeetingsFromDB = async () => {
    let supabase = createClient();
    const {data, error} = await supabase.from('meetings').select();
    return data;
}

GetMeetingsFromDB().then((data) => {
  if (data) {
    data.forEach((meeting) => {
      meetingsCache[meeting.email] = true;
    });
  }
});

export async function GET(req: NextRequest) {
  // Get the user's email from the query parameter
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  // Check if the email exists in the cache
  const hasPendingMeeting = !!meetingsCache[email];

  return NextResponse.json({ hasPendingMeeting });
}

function validateRequestBody(body: any) {
    const requiredFields = ['fullName', 'companyName', 'email', 'meetingPreference', 'avaibleHour', 'date', 'category'];
    for (const field of requiredFields) {
        if (!body[field]) {
            return false;
        }
    }
    return true;
}

export async function POST(req: NextRequest, res: any) {
    const rateLimitResponse = postLimit(req as any);

    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    const body = await req.json();

    if (!validateRequestBody(body)) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    console.log('Request Body:', body);

    let supabase = createClient(req as any, res);

    const { data, error } = await supabase.from('meetings').insert([
        {
            name: body.fullName,
            company: body.companyName,
            email: body.email,
            meeting: body.meetingPreference,
            time: body.avaibleHour,
            date: body.date,
            type: body.category,
        }
    ]);

    if (error) {
        console.error('Database insert error:', error.message);
        return NextResponse.json({ message: 'Database insert error', error: error.message }, { status: 500 });
    }

    // Update the cache
    meetingsCache[body.email] = true;

    // inform the admin about the new meeting request
    try {
        const {data, error} = await resend.emails.send({
            from: `Meeting Scheduler <meetings@syntramedia.com>`,
            to: ['furkanesen@syntramedia.com', 'emirayaz@syntramedia.com'],
            subject: 'New Meeting Request! 🚀',
            react: EmailTemplate({body}),
        })

        if (error) {
            return NextResponse.json({error: 'Failed to send email'}, {status: 500})
        }
    } catch (error) {
        return NextResponse.json({error: 'Failed to send email'}, {status: 500})
    }

    return NextResponse.json({ message: 'POST request successful', data });
}