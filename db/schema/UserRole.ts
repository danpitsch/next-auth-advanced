import {
  sqliteTable,
  uniqueIndex,
  text,
} from "drizzle-orm/sqlite-core"

export const UserRole = sqliteTable("UserRole", {
	name: text("name").notNull(),
},
(table) => {
	return {
		name_key: uniqueIndex("UserRole_name_key").on(table.name),
	}
});
