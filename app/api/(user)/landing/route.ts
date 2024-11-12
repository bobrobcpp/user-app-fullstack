import { NextResponse } from "next/server";
import { getUser } from './actions';
import 'dotenv/config';

export async function GET() {
    const result = await getUser();
    if (result?.error) return NextResponse.json({ error: 'Failed to get user.' }, { status: 500 });

    return NextResponse.json({ data: result });
}