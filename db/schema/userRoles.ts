import { sqliteTable, uniqueIndex, text } from 'drizzle-orm/sqlite-core'

export const userRoles = sqliteTable(
	'userRole',
	{
		name: text('name').notNull(),
	},
	(userRole) => {
		return {
			name_key: uniqueIndex('UserRole_name_key').on(userRole.name),
		}
	}
)
