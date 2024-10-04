import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as Session from "@/app/lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/users", "/users/new"];
const cookiesName = process.env.COOKIES_NAME;

export default async function (req: NextRequest) {
  if (cookiesName) {
    //  Decrypt the session from cookie
    const token = cookies().get(cookiesName)?.value;
    const session = token ? await Session.decryptJWT(token) : undefined;

    //  Check if the current route is protected
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);

    // Redirect if user is not authenticated
    if (!session?.id && isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
