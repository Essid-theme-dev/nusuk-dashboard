import { NextResponse } from "next/server";
import { getSessionUser, requireAdmin } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const body = (await request.json()) as { name?: string; email?: string };
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!name || !email) {
    return NextResponse.json({ error: "Nom et email requis" }, { status: 400 });
  }

  const { prisma } = await import("@/app/lib/prisma");

  const existing = await prisma.adminUser.findFirst({
    where: { email, NOT: { id: auth.id } },
  });
  if (existing) {
    return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
  }

  const user = await prisma.adminUser.update({
    where: { id: auth.id },
    data: { name, email },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  return NextResponse.json(user);
}
