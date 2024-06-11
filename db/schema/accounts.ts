import {
	sqliteTable,
	text,
  primaryKey,
  uniqueIndex,
	integer,
} from 'drizzle-orm/sqlite-core'
import { id, uuid } from './schema-util'
import { users } from './users'

export const accounts = sqliteTable(
	'account',
	{
    // id: id(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').default('Credentials').notNull(),
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
