import {
	integer,
  sqliteTable,
	primaryKey,
  uniqueIndex,
	text,
	numeric,
} from 'drizzle-orm/sqlite-core'
import { id } from './schema-util'

export const passwordResetTokens = sqliteTable(
	'passwordResetTokens',
	{
    id: text("id").notNull()
    .$defaultFn(() => crypto.randomUUID()),
		email: text('email').unique().notNull(),
		token: text('token').notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
  (passwordResetToken) => ({
    compositePk: primaryKey({
      columns: [passwordResetToken.id, passwordResetToken.token],
    }),
  })
)
