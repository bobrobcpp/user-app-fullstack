import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUser } from './actions';
import 'dotenv/config';

interface Context {
    params: undefined;
}

export async function GET(request: NextRequest, context: Context) {
    const result = await getUser();
    if (result?.error) return NextResponse.json({ error: 'Failed to get user.' }, { status: 500 });

    return NextResponse.json({ data: result });
}