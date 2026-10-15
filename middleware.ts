import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "nusuk_session";

function getAuthSecret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "nusuk-dev-secret-change-me-32chars",
  );
}

async function isValidSession(token: string | undefined) {
  if (!token) return false;
  try {
    await jwtVerify(token, getAuthSecret());
    return true;
  } catch {
    return false;
  }
}

const protectedApiPrefixes = [
  "/api/omra",
  "/api/pilgrims",
  "/api/cms",
  "/api/settings",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const loggedIn = await isValidSession(token);

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (loggedIn) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!loggedIn) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth/login")) {
    return NextResponse.next();
  }

  if (protectedApiPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    if (!loggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname === "/api/contact" && request.method !== "POST") {
    if (!loggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/omra", "/api/omra/:path*", "/api/pilgrims", "/api/pilgrims/:path*", "/api/cms", "/api/settings", "/api/contact", "/api/auth/login"],
};
