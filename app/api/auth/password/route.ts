import { NextResponse } from "next/server";
import { hashPassword, requireAdmin, verifyPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const body = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  const { currentPassword, newPassword, confirmPassword } = body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Le mot de passe doit contenir au moins 8 caractères" }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "Les mots de passe ne correspondent pas" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { id: auth.id } });
  if (!user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });
  }

  await prisma.adminUser.update({
    where: { id: auth.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });

  return NextResponse.json({ success: true });
}
