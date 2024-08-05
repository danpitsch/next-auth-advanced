import {
	integer,
  sqliteTable,
	primaryKey,
  uniqueIndex,
	text,
	numeric,
} from 'drizzle-orm/sqlite-core'
import { id } from './schema-util'

export const verificationTokens = sqliteTable(
	'verificationTokens',
	{
    identifier: text("identifier").notNull()
    .$defaultFn(() => crypto.randomUUID()),
		email: text('email').unique().notNull(),
		token: text('token').notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
