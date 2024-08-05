import { eq, sql } from "drizzle-orm";
import { db, passwordResetTokens } from "@/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.select().from(passwordResetTokens).where(sql`"token" = ${token}`);
    if (!passwordResetToken || passwordResetToken.length === 0) {
      return null;
    } else {
      return passwordResetToken[0];
    }
  } catch {
    return null;
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.select().from(passwordResetTokens).where(sql`"email" = ${email}`);
    if (!passwordResetToken || passwordResetToken.length === 0) {
      return null;
    } else {
      return passwordResetToken[0];
    }
  } catch {
    return null;
  }
}