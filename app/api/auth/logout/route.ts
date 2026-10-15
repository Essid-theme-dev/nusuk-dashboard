import { NextResponse } from "next/server";
import { clearSessionCookie, requireAdmin } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) {
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  }
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
