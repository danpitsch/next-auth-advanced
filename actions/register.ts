"use server";

import { eq, sql } from "drizzle-orm";
import { db, userRoles, users } from "@/db";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("/actions/register.ts: register: email", email);
  console.log("/actions/register.ts: register: hashedPassword", hashedPassword);
  console.log("/actions/register.ts: register: name", name);
  console.log("/actions/register.ts: register: creating user");

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    console.log("/actions/register.ts: register: no existing user found");
  } else {
    return { error: "Email is already taken" };
  }

  const newUser = await db.insert(users).values([{
    name: name,
    email: email,
    password: hashedPassword,
    role: 'USER'
  }]);

  const verificationToken = await generateVerificationToken(email);

  console.log("/actions/register.ts: register: verificationToken", verificationToken);

  await sendVerificationEmail(verificationToken.email, verificationToken.token, name);

  return { success: "Confirmation email sent!" };
}