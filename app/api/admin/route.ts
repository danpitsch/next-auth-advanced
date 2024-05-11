import { currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const role = await currentRole()
  // console.log("/app/api/admin/route.ts > GET > role:", role);

  if (role === 'ADMIN') {
    return new NextResponse(null, { status: 200 })
  }

  return new NextResponse(null, { status: 403 })
}
