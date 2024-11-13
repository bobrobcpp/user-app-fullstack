'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
    users,
} from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/session';

import {
    validatedAction,
} from '@/lib/auth/middleware';

const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
    const { name, email, password } = data;

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return { error: 'Failed to create user. Please try again.' };
    }

    const passwordHash = await hashPassword(password);

    const newUser: any = { name, email, passwordHash };
    try {
        const [createdUser] = await db.insert(users).values(newUser).returning();

        if (!createdUser) {
            return { error: 'Failed to create user. Please try again.' };
        }
    }
    catch (error) {
        return { error: error ? error : 'Failed to create user. Please try again.' };
    }
});
