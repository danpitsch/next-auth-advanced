import 'dotenv/config';
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

export { accounts, passwordResetTokens, twoFactorConfirmations, twoFactorTokens, users, userRoles, verificationTokens, sessions, authenticators };

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
 
const client = createClient({ url: db_url, authToken: '...'});
 
export const db = drizzle(client, { schema });

