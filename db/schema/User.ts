import {
	sqliteTable,
	uniqueIndex,
	text,
	numeric,
} from 'drizzle-orm/sqlite-core'
import { id, createdAt, updatedAt } from './schema-util'
import { UserRole} from "./UserRole";

export const User = sqliteTable(
	'Users',
	{
    id: id(),
		name: text('name'),
		email: text('email').unique().notNull(),
		emailVerified: numeric('emailVerified'),
		password: text('password'),
    role: text('role').references(() => UserRole.name).default('USER').notNull(),
		isTwoFactorEnabled: numeric('isTwoFactorEnabled').notNull(),
		image: text('image'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
	},
	(table) => {
		return {
			email_key: uniqueIndex('User_email_key').on(table.email),
		}
	}
)
