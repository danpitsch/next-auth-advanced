import NextAuth from "next-auth";
import { sql, eq } from "drizzle-orm";
import { db, accounts, sessions, users, twoFactorConfirmations } from "@/db";
import { UserRole } from "./next-auth.d";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(
  {
    pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.update(users).set({ emailVerified: new Date() }).where(sql`"id" = ${user.id}`);
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("auth.ts > signIn() > inside callback");
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);

        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete two factor confirmation for next sign in
        await db.delete(twoFactorConfirmations).where(sql`"id" = ${twoFactorConfirmation.id}`);
      }

      return true;
    },

    async session({ token, session }) {
      
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      
      // Custom token fields
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name,
      token.email = existingUser.email,
      token.image = existingUser.image,
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    }
  },
  session: { strategy: "jwt" }, 
  ...authConfig,
})