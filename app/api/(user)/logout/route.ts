import { NextResponse } from "next/server";
import { signOut } from './actions';
import 'dotenv/config';

export async function POST() {
    try {
        await signOut();
        return NextResponse.json({ redirect: '/login' });
    }
    catch (error) {
        return NextResponse.json({ error: 'Failed to log out user. Please try again.' }, { status: 401 });
    }
}
