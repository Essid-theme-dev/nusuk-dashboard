import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const AUTH_COOKIE = "nusuk_session";
const SESSION_DAYS = 7;

export type AdminSessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production");
  }
  return new TextEncoder().encode(secret ?? "nusuk-dev-secret-change-me-32chars");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getAuthSecret());
  return typeof payload.sub === "string" ? payload.sub : null;
}

export function sessionCookieOptions(maxAge = SESSION_DAYS * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function setSessionCookie(userId: string) {
  const token = await createSessionToken(userId);
  (await cookies()).set(AUTH_COOKIE, token, sessionCookieOptions());
}

export async function clearSessionCookie() {
  (await cookies()).set(AUTH_COOKIE, "", { ...sessionCookieOptions(0), maxAge: 0 });
}

export async function getSessionUserId() {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<AdminSessionUser | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;
  const user = await prisma.adminUser.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return user;
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}

export async function authenticateAdmin(email: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return null;
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;
  return user;
}
