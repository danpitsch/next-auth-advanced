import {
	sqliteTable,
	uniqueIndex,
	text,
	numeric,
} from 'drizzle-orm/sqlite-core'
import { id } from './schema-util'

export const twoFactorTokens = sqliteTable(
	'twoFactorToken',
	{
		id: id(),
		email: text('email').notNull(),
		token: text('token').notNull(),
		expires: numeric('expires').notNull(),
	},
	(twoFactorToken) => {
		return {
			email_token_key: uniqueIndex('TwoFactorToken_email_token_key').on(
				twoFactorToken.email,
				twoFactorToken.token
			),
			token_key: uniqueIndex('TwoFactorToken_token_key').on(twoFactorToken.token),
		}
	}
)
