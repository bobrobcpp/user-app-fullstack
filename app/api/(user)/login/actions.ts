'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
    users,
} from '@/lib/db/schema';
import { comparePasswords, setSession } from '@/lib/auth/session';

import {
    validatedAction,
} from '@/lib/auth/middleware';


const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
    const { email, password } = data;

    const user = await db
        .select({
            user: users,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (user === null || user === undefined || user.length === 0) {
        return { error: 'Invalid email or password. Please try again.' };
    }

    const { user: foundUser } = user[0];

    const isPasswordValid = await comparePasswords(
        password,
        foundUser.passwordHash
    );

    if (!isPasswordValid) {
        return { error: 'Invalid email or password. Please try again.' };
    }

    await Promise.all([
        setSession(foundUser),
    ]);
    return { redirect: '/landing' };
});