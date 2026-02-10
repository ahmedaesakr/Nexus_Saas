import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard =
        req.nextUrl.pathname.startsWith("/dashboard") ||
        req.nextUrl.pathname.startsWith("/workflows") ||
        req.nextUrl.pathname.startsWith("/agents") ||
        req.nextUrl.pathname.startsWith("/executions") ||
        req.nextUrl.pathname.startsWith("/integrations") ||
        req.nextUrl.pathname.startsWith("/users") ||
        req.nextUrl.pathname.startsWith("/settings") ||
        req.nextUrl.pathname.startsWith("/templates");
    const isOnAuth = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");

    if (isOnDashboard) {
        if (isLoggedIn) return NextResponse.next();
        return NextResponse.redirect(new URL("/login", req.nextUrl)); // Redirect to login
    }

    if (isOnAuth) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl)); // Redirect to dashboard
        }
        return NextResponse.next();
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
