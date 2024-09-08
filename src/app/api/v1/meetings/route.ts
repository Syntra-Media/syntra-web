// app/api/v1/meetings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/utils/rateLimit';

const limit = rateLimit(10, 60000); // 10 requests per minute (60,000 ms)

const username = "usr_uETJN3twzmfNAXYSG";
const password = "5da59c644ca65aa0217c98f8cdff5946";
const token = btoa(`${username}:${password}`);

export async function GET(req: NextRequest) {
    const rateLimitResponse = limit(req);

    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    let body = req.body;


    let response = await fetch('https://api.lemcal.com/api/lemcal/meetings', {
         headers: {
              'Authorization': `Basic ${token}`
         }
    });

    let data = await response.json();

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const rateLimitResponse = limit(req);

    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    // Handle POST logic
    return NextResponse.json({ message: 'POST request successful' });
}