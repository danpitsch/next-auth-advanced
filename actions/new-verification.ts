"use server";

import { eq, sql } from "drizzle-orm";
import { db, users, verificationTokens } from "@/db";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  await db.update(users)
  .set({
    emailVerified: new Date(),
    email: existingToken.email,
  })
  .where(sql`"id" = ${existingUser.id}`);

  await db.delete(verificationTokens).where(sql`"identifier" = ${existingToken.identifier}`);

  return { success: "Email verified!" };
}