import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { drizzle } from 'drizzle-orm/node-postgres';
import { signUp } from './actions';
import 'dotenv/config';

interface Context {
    params: undefined;
}

export async function POST(request: NextRequest, context: Context) {
    const db = drizzle(process.env.DATABASE_URL);
    const response = await request.json();

    const user = await signUp(db, response);

    return NextResponse.json({ data: response });
}