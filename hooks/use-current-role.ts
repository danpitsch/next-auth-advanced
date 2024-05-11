import { UserRole } from "@prisma/client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

/**
 * 
 * Returns the currently logged in user's role.
 * @type {"ADMIN" | "USER"}
 */

export const useCurrentRole = () => {
  const session = useSession();
  // console.log("/hooks/use-current-role.ts > useCurrentRole > session.data?.user?.role:", session.data?.user?.role);
  return session.data?.user?.role as String | undefined;
}