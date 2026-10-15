import { NextResponse } from "next/server";
import { authenticateAdmin, setSessionCookie } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const user = await authenticateAdmin(email, password);
    if (!user) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    await setSessionCookie(user.id);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch {
    return NextResponse.json({ error: "Erreur de connexion" }, { status: 500 });
  }
}
