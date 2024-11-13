import {
    pgTable,
    integer,
    varchar,
    text,
    timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 100 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
