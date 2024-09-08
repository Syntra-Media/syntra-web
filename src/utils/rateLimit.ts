import { NextRequest, NextResponse } from 'next/server';

type RateLimit = {
    [key: string]: number[];
};

const rateLimit = (limit: number, timeWindow: number) => {
    const requests: RateLimit = {};

    return (req: NextRequest): NextResponse | null => {
        // Extract IP from headers or fallback to 'unknown'
        const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
        const currentTime = Date.now();

        if (!requests[ip]) {
            requests[ip] = [];
        }

        const requestTimes = requests[ip].filter(time => currentTime - time < timeWindow);

        if (requestTimes.length >= limit) {
            return NextResponse.json(
                { message: 'Too many requests, please try again later.' },
                { status: 429 }
            );
        }

        requestTimes.push(currentTime);
        requests[ip] = requestTimes;

        return null; // No rate limit exceeded, continue with the request.
    };
};

export default rateLimit;
