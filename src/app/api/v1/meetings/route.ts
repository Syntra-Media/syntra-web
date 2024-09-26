import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/utils/rateLimit';
import createClient from '@/utils/supabaseServer';
import {Resend} from "resend";
import {EmailTemplate} from "@/components/ui/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

const limit = rateLimit(1, 86400000) // 1 requests per day

export async function GET(req: any, res: any) {
    const rateLimitResponse = limit(req);

    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    let body = req.body;
    let supabase = createClient(req, res);

    return NextResponse.json({ message: 'GET request successful' });
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
    const rateLimitResponse = limit(req as any);

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