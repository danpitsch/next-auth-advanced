// import 'dotenv/config';

// SQLite3 Variation
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// const sqlite = new Database('process.env.DATABASE_URL');
// export const db = drizzle(sqlite);

// Turso Variation
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { accounts } from './schema/accounts';
import { passwordResetTokens } from './schema/passwordResetTokens';
import { twoFactorConfirmations } from './schema/twoFactorConfirmations';
import { twoFactorTokens } from './schema/twoFactorTokens';
import { users } from './schema/users';
import { userRoles } from './schema/userRoles';
import { verificationTokens } from './schema/verificationTokens';
import { sessions } from './schema/sessions';
import { authenticators } from './schema/authenticators';

export {
  accounts, passwordResetTokens, twoFactorConfirmations, twoFactorTokens, users, userRoles, verificationTokens, sessions, authenticators, // import Database from 'better-sqlite3';
};

export const schema = {
  accounts,
  passwordResetTokens,
  twoFactorConfirmations,
  twoFactorTokens,
  users,
  userRoles,
  verificationTokens,
  sessions,
  authenticators
};
 
const db_url: string = process.env.DATABASE_URL as string;
const db_sync_url: string = process.env.DATABASE_SYNC_URL as string;
const db_auth: string = process.env.DATABASE_AUTH_TOKEN as string;

console.log(`auth.config.ts > DATABASE_URL: `, db_url);
console.log(`auth.config.ts > DATABASE_SYNC_URL: `, db_sync_url);
console.log(`auth.config.ts > DATABASE_AUTH_TOKEN: `, db_auth);

export const libsqlClient = createClient({
  url: db_url,
  syncUrl: db_sync_url,
  authToken: db_auth,
  syncInterval: 60,
});

console.log(`auth.config.ts: syncing database...`);

libsqlClient.sync()

console.log(`auth.config.ts: database sync complete`);

export const db = drizzle(libsqlClient, { schema });

