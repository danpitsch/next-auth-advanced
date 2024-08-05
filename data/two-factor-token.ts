import { eq, sql } from "drizzle-orm";
import { db, twoFactorTokens } from "@/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.select().from(twoFactorTokens).where(sql`"token" = ${token}`);
    if (!twoFactorToken || twoFactorToken.length === 0) {
      return null;
    } else {
      return twoFactorToken[0];
    }
  } catch {
    return null;
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.select().from(twoFactorTokens).where(sql`"email" = ${email}`);
    if (!twoFactorToken || twoFactorToken.length === 0) {
      return null;
    } else {
      return twoFactorToken[0];
    }
  } catch {
    return null;
  }
}