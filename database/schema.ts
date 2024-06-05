import { sql } from "drizzle-orm"
import { randomUUID } from 'crypto'

import {
  // timestamp,
  sqliteTable,
  text,
  primaryKey,
  integer,
  // uuid,
} from 'drizzle-orm/sqlite-core';

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const uuid = () =>
  text('userId')
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

import type { AdapterAccount } from 'next-auth/adapters';

export const users = sqliteTable('user', {
  id: id(),
  name: text('name'),
  email: text('email').unique().notNull(),
  password: text('password'),
  emailVerified: createdAt(),
  // emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = sqliteTable(
  'account',
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  // expires: timestamp('expires', { mode: 'date' }).notNull(),
  expires: createdAt(),
});

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: createdAt(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
