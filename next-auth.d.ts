import NextAuth, { type DefaultSession } from "next-auth";
import { userRoles } from "./db";

export type UserRole = typeof userRoles.name.dataType;

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  image: string;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}