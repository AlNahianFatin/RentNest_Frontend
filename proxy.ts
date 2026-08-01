import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { getNewAccessToken } from './service/refreshToken';
import { UserRole } from './lib/types';
// import { getSubscriptionStatus } from './app/(publicGroup)/_actions/getSubscriptionStatus';

const AUTH_ROUTES = [
    "/login",
    "/register"
]

const PUBLIC_ROUTES = [
    "/",
    "/rentals"
]

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const cookieStore = await cookies();

    let accessToken = request.cookies.get("accessToken")?.value;

    const refreshToken = request.cookies.get("refreshToken")?.value;


    let decodedAccessToken = accessToken ? await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodedRefreshToken = refreshToken ? await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax"
            });

            accessToken = newAccessToken;
            decodedAccessToken = accessToken ? await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
        }
    }

    if (!decodedAccessToken?.success) 
        cookieStore.delete("accessToken");

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));

    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/login', request.url);

        loginUrl.searchParams.set("redirectTo", pathName);

        return NextResponse.redirect(loginUrl);
    }

    let userRole = null;

    if (decodedAccessToken?.success && decodedAccessToken.data)
        userRole = (decodedAccessToken.data as JwtPayload).role;

    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole === UserRole.TENANT)
            return NextResponse.redirect(new URL('/tenant-dashboard', request.url));
        else if (userRole === UserRole.LANDLORD)
            return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        else if (userRole === UserRole.ADMIN)
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        else
            return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathName.startsWith("/tenant-dashboard") && userRole !== UserRole.TENANT)
        return NextResponse.redirect(new URL('/not-found', request.url));
    else if (pathName.startsWith("/landlord-dashboard") && userRole !== UserRole.LANDLORD)
        return NextResponse.redirect(new URL('/not-found', request.url));
    else if (pathName.startsWith("/admin-dashboard") && userRole !== UserRole.ADMIN)
        return NextResponse.redirect(new URL('/not-found', request.url));

    // if (pathName.startsWith("/premium")) {
    //     const subscriptionStatus = await getSubscriptionStatus();

        // const isActive = Boolean(subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed);

    //     if (!(userRole === "ADMIN") && !isActive)
    //         return NextResponse.redirect(new URL('/payment', request.url));
    // }

    // if (pathName.startsWith("/payment")) {
    //     const subscriptionStatus = await getSubscriptionStatus();

    //     const isActive = Boolean(subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed);

    //     if (userRole === "ADMIN" || isActive)
    //         return NextResponse.redirect(new URL('/premium', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}