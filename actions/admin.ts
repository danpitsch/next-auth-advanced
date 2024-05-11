"use server";

import { currentRole } from "@/lib/auth";
import { NextResponse } from "next/server";

export const admin = async () => {
  const role = await currentRole();
  // console.log("/actions/admin.ts > admin > role:", role);

  if (role !== 'ADMIN') {
    return { error: "Forbidden" }
  }

  return { success: "Success!" }
}