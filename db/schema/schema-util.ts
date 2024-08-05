import { sql } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { text } from 'drizzle-orm/sqlite-core'

export const id = () =>
	text('id')
		.primaryKey()
		.$default(() => randomUUID())

export const uuid = () => text('userId').$default(() => randomUUID())

export const createdAt = () =>
	text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()

export const updatedAt = () =>
	text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
