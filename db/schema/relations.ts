import { relations } from 'drizzle-orm/relations'
import { users } from './users'
import { userRoles } from './userRoles'
import { accounts } from './accounts'
import { twoFactorConfirmations } from './twoFactorConfirmations'

export const AccountRelations = relations(accounts, ({ one }) => ({
	User: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}))

export const UserRelations = relations(users, ({ many }) => ({
	Accounts: many(accounts),
	TwoFactorConfirmations: many(twoFactorConfirmations),
}))

export const TwoFactorConfirmationRelations = relations(
	twoFactorConfirmations,
	({ one }) => ({
		User: one(users, {
			fields: [twoFactorConfirmations.userId],
			references: [users.id],
		}),
	})
)
