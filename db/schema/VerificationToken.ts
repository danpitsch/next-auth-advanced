import {
  sqliteTable,
  uniqueIndex,
  text,
  numeric
} from "drizzle-orm/sqlite-core"
import { id } from './schema-util'

export const VerificationToken = sqliteTable("VerificationToken", {
  id: id(),
  email: text("email").notNull(),
	token: text("token").notNull(),
	expires: numeric("expires").notNull(),
},
(table) => {
	return {
		email_token_key: uniqueIndex("VerificationToken_email_token_key").on(table.email, table.token),
		token_key: uniqueIndex("VerificationToken_token_key").on(table.token),
	}
});

