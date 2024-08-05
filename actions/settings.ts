"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { sql } from "drizzle-orm";
import { db, users } from "@/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized!" }
  };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email is already taken!" };
    };

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verificationToken.token, verificationToken.email, existingUser?.name!);

    return { success: "Verification email sent!" };
  };

  if (values.password && values.password && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: "Current password is incorrect!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword!, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.update(users).set({
    role: values.role,
    name: values.name,
    email: values.email,
    password: values.password,
    isTwoFactorEnabled: values.isTwoFactorEnabled === true ? '1' : '0',
  }).where(sql`"id" = ${dbUser.id}`);
  
  return { success: "Settings updated!" };
}