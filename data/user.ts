import { eq, sql } from "drizzle-orm";
import { db, users } from "@/db";

export const getUserByEmail = async (locEmail: string) => {
  try {
    console.log("/data/user.ts > getUserByEmail() > locEmail: ", locEmail);
    const user = await db.select().from(users).where(sql`"email" = ${locEmail}`);
    console.log("/data/user.ts > getUserByEmail() > user", user.length, user);
    if (!user || user.length === 0) {
      return null;
    } else {
      return user[0];
    }
  } catch {
    return null;
  }
}

export const getUserById = async (locId: string) => {
  try {
    const user = await db.select().from(users).where(sql`"id" = ${locId}`);
    if (!user || user.length === 0) {
      return null;
    } else {
      return user[0];
    }
  } catch {
    return null;
  }
}