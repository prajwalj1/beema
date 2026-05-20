// middleware.js  (in project root)

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Allow API, static, assets
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role || "customer";

    if (role === "admin") {
      return NextResponse.next();
    }

    if (role === "promoter") {
      if (
        !pathname.startsWith("/dashboard/promoter") &&
        !pathname.startsWith("/profile")
      ) {
        return NextResponse.redirect(
          new URL("/dashboard/promoter", req.url)
        );
      }
    } else {
      if (
        !pathname.startsWith("/dashboard/customer") &&
        !pathname.startsWith("/profile")
      ) {
        return NextResponse.redirect(
          new URL("/dashboard/customer", req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};