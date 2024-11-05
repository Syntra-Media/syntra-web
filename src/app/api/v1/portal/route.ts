import {NextRequest, NextResponse} from 'next/server';

const GetHandler = (req: NextRequest, res: NextResponse) => {
    return NextResponse.json({status: "200"})
}

const DeleteHandler = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({status: "200"})
}

export {GetHandler as GET, DeleteHandler as DELETE}