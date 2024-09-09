import {NextRequest, NextResponse} from 'next/server';

const handler = (req: NextRequest, res: NextResponse) => {
    return NextResponse.json({status: "200"})
}

export {handler as GET}