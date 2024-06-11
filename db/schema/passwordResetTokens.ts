import {
	sqliteTable,
	uniqueIndex,
	text,
	numeric,
} from 'drizzle-orm/sqlite-core'
import { id } from './schema-util'

export const passwordResetTokens = sqliteTable(
	'passwordResetToken',
	{
		id: id(),
		email: text('email').notNull(),
		token: text('token').notNull(),
		expires: numeric('expires').notNull(),
	},
	(passwordResetToken) => {
		return {
			email_token_key: uniqueIndex('PasswordResetToken_email_token_key').on(
				passwordResetToken.email,
				passwordResetToken.token
			),
			token_key: uniqueIndex('PasswordResetToken_token_key').on(passwordResetToken.token),
		}
	}
)
