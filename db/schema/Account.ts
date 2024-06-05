import {
	sqliteTable,
	text,
  uniqueIndex,
	integer,
} from 'drizzle-orm/sqlite-core'
import { id, createdAt, updatedAt, uuid } from './schema-util'
import { User } from './User'

export const Account = sqliteTable(
	'Account',
	{
    id: id(),
    userId: uuid()
      .notNull()
      .references(() => User.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
	},
  (table) => {
    return {
      provider_providerAccountId_key: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
    }
  }
);
