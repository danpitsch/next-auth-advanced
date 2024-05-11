"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: String;
};

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  // console.log("/components/auth/role-gate.tsx > RoleGate > role:", role);
  // console.log("/components/auth/role-gate.tsx > RoleGate > allowedRole:", allowedRole);

  if (role !== allowedRole) {
    return <FormError message="You do not have premission to view this content!" />
  }

  return (
    <>
      {children}
    </>
  )
}