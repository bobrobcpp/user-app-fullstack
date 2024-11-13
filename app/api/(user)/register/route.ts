import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { drizzle } from 'drizzle-orm/node-postgres';
import { signUp } from './actions';
import 'dotenv/config';

export async function POST(request: NextRequest) {
    const db = drizzle(process.env.DATABASE_URL);

    try {
        const response = await request.json();

        const result = await signUp(db, response);
        if (result?.error) return NextResponse.json({ error: 'Failed to create user. Please try again.' }, { status: 500 });
        return NextResponse.json({ data: result });
    }
    catch (error) {
        return NextResponse.json({ error: 'Failed to create user. Please try again.' }, { status: 500 });
    }
}