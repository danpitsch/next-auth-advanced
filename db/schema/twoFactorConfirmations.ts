import { sqliteTable, uniqueIndex, text } from 'drizzle-orm/sqlite-core'
import { id } from './schema-util'
import { users } from './users'

export const twoFactorConfirmations = sqliteTable(
	'twoFactorConfirmations',
	{
		id: id(),
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	},
	(twoFactorConfirmation) => {
		return {
			userId_key: uniqueIndex('TwoFactorConfirmation_userId_key').on(
				twoFactorConfirmation.userId
			),
		}
	}
)
