import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { drizzle } from 'drizzle-orm/node-postgres';
import { signIn } from './actions';
import 'dotenv/config';

export async function POST(request: NextRequest) {
    const db = drizzle(process.env.DATABASE_URL as string);
    const response = await request.json();

    const result = await signIn(db, response);

    if (result?.error) return NextResponse.json({ error: 'Failed to log in user. Please try again.' }, { status: 401 });

    return NextResponse.json({ data: result });
}