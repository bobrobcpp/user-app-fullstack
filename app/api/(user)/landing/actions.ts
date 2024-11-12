'use server'

import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie || !sessionCookie.value) {
        return null;
    }

    const sessionData = await verifyToken(sessionCookie.value);
    if (
        !sessionData ||
        !sessionData.user ||
        typeof sessionData.user.id !== 'number'
    ) {
        return null;
    }

    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }

    const user = await db
        .select({
            name: users.name,
            email: users.email,
        })
        .from(users)
        .where(and(eq(users.id, sessionData.user.id)))
        .limit(1);

    if (user.length === 0) {
        return null;
    }

    return user[0];
}