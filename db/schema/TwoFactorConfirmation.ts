import {
  sqliteTable,
  uniqueIndex,
  text,
} from "drizzle-orm/sqlite-core"
import { id } from './schema-util'

import { User } from "./User"

export const TwoFactorConfirmation = sqliteTable("TwoFactorConfirmation", {
  id: id(),
	userId: text("userId").notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		userId_key: uniqueIndex("TwoFactorConfirmation_userId_key").on(table.userId),
	}
});
