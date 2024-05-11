"use server";

import { db } from "@/lib/db";

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

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already taken" };
  }

  // console.log("/actions/register.ts: register: email", email);
  // console.log("/actions/register.ts: register: hashedPassword", hashedPassword);
  // console.log("/actions/register.ts: register: name", name);
  // console.log("/actions/register.ts: register: creating user");

  await db.userRole.findUnique({
    where: { name: "USER" },
    select: { name: true },
  }).then((role) => {
    // console.log("user role", role);
    if (!role) {
      let roleData: Prisma.UserRoleCreateInput
      roleData = { name: "USER" as string } // Ensure name is always a string
      // console.log("Creating USER role:", roleData);
      const userRole = db.userRole.create({
        data: roleData,
      });
      // console.log("userRole", userRole);
    }
  })
  
  await db.userRole.findUnique({
    where: { name: "ADMIN" },
    select: { name: true },
  }).then((role) => {
    // console.log("admin role", role);
    if (!role) {
      let roleData: Prisma.UserRoleCreateInput
      roleData = { name: "ADMIN" as string } // Ensure name is always a string
      // console.log("Creating ADMIN role:", roleData);
      const adminRole = db.userRole.create({
        data: roleData,
      });
      // console.log("adminRole", adminRole);
    }
  })

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  });

  const verificationToken = await generateVerificationToken(email);

  // console.log("/actions/register.ts: register: verificationToken", verificationToken);

  await sendVerificationEmail(verificationToken.email, verificationToken.token, name);

  return { success: "Confirmation email sent!" };
}