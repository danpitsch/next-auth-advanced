import {
  sqliteTable,
  uniqueIndex,
  text,
  numeric
} from "drizzle-orm/sqlite-core"
import { id } from './schema-util'

export const PasswordResetToken = sqliteTable("PasswordResetToken", {
  id: id(),
	email: text("email").notNull(),
	token: text("token").notNull(),
	expires: numeric("expires").notNull(),
},
(table) => {
	return {
		email_token_key: uniqueIndex("PasswordResetToken_email_token_key").on(table.email, table.token),
		token_key: uniqueIndex("PasswordResetToken_token_key").on(table.token),
	}
});
