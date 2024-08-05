import {
	sqliteTable,
	text,
	primaryKey,
	uniqueIndex,
	integer,
} from 'drizzle-orm/sqlite-core'
import { users } from './users'

export const sessions = sqliteTable(
  'sessions',
  {
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  }
)
