import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest) {
  const user = getCookie("user", { req });

  const loginUrl = new URL("/login", req.url);

  if (!user && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(loginUrl);
  }

  if (
    (user && req.nextUrl.pathname === "/login") ||
    req.nextUrl.pathname === "/"
  ) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/", "/login"],
};
