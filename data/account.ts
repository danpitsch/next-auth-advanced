import { eq, sql } from "drizzle-orm";
import { db, accounts } from "@/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.select().from(accounts).where(sql`"userId" = ${userId}`);
    if (!account || account.length === 0) {
      return null;
    } else {
      return account[0];
    }
  } catch (error) {
    return null;
  }
}