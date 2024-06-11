import {
	integer,
  sqliteTable,
	uniqueIndex,
	text,
	numeric,
} from 'drizzle-orm/sqlite-core'
import { id, createdAt, updatedAt } from './schema-util'
import { userRoles } from "./userRoles";

export const users = sqliteTable(
	'user',
	{
    id: id(),
		name: text('name'),
		email: text('email').unique().notNull(),
		emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
		image: text('image'),
		password: text('password'),
    role: text('role').references(() => userRoles.name).default('USER').notNull(),
		isTwoFactorEnabled: numeric('isTwoFactorEnabled').notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
	},
	(user) => {
		return {
			email_key: uniqueIndex('User_email_key').on(user.email),
		}
	}
)
