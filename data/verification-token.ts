import { eq, sql } from "drizzle-orm";
import { db, verificationTokens } from "@/db";

export const getVerificationTokenByToken = async (
  token: string
) => {
  try {
    const verificationToken = await db.select().from(verificationTokens).where(sql`"token" = ${token}`);
    if (!verificationToken || verificationToken.length === 0) {
      return null;
    } else {
      return verificationToken[0];
    }
  } catch (error) {
    return null;
  }
}

export const getVerificationTokenByEmail = async (
  email: string
) => {
  try {
    console.log("/data/verification-token.ts: getVerificationTokenByEmail: email", email);
    const verificationToken = await db.select().from(verificationTokens).where(sql`"email" = ${email}`);
    console.log("/data/verification-token.ts: getVerificationTokenByEmail: verificationToken", verificationToken);
    if (!verificationToken || verificationToken.length === 0) {
      return null;
    } else {
      return verificationToken[0];
    }
  } catch (error) {
    return null;
  }
}