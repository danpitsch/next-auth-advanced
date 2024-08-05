import { sql } from "drizzle-orm";
import { db, twoFactorTokens } from "@/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => { 
  try {
    const twoFactorConfirmation = await db.select().from(twoFactorTokens).where(sql`"id" = ${userId}`);

    if (!twoFactorConfirmation || twoFactorConfirmation.length === 0) {
      return null;
    } else {
      return twoFactorConfirmation[0];
    }
  } catch {
    return null;
  }
}