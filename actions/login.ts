"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sql } from "drizzle-orm";
import { db, twoFactorTokens } from "@/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { twoFactorConfirmations } from "@/db/schema/twoFactorConfirmations";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string) => {
  console.log("/actions/login.ts > login() > values:", values);

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, code } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("/actions/login.ts > login() > email: ", email);
  console.log("/actions/login.ts > login() > hashedPassword: ", hashedPassword);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.log("/actions/login.ts > login() > existingUser: ", existingUser);
  } else {
    console.log("/actions/login.ts > login(): User Email not found");
    return { error: "User Email not found" };
  }

  if (!existingUser || !existingUser.email) {
    return { error: "Invalid credentials!" }
  }

  if (!existingUser.password) {
    return { error: "Login With a OAuth provider." }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    console.log("/actions/login.ts > login() > verificationToken: ", verificationToken);

    await sendVerificationEmail(verificationToken.email, verificationToken.token, existingUser.name!);

    return { success: "Confirmation email sent!" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code has expired!" }
      }

      await db.delete(twoFactorTokens).where(sql`"id" = ${twoFactorToken.id}`);

      const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingTwoFactorConfirmation) {
        await db.delete(twoFactorConfirmations).where(sql`"id" = ${existingTwoFactorConfirmation.id}`);
      }

      await db.insert(twoFactorConfirmations).values({ userId: existingUser.id });

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token, existingUser.name!);
      return { twoFactor: true };
    }
  }

  try {
    console.log("/actions/login.ts > login() > inside try block");
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": 
          return { error: "Invalid credentials!" }
        default: 
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}