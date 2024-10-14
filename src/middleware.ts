
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    if ((await isAuthenticated(req)) === false) {
        return new NextResponse(
            'Unauthorized',
            {
                status: 401,
                // use Basic Authentication built in browser
                headers: { "WWW-Authenticate": 'Basic' }
            }
        )
    }
}

async function isAuthenticated(req: NextRequest) {
    return Promise.resolve(false)
}


export const config = {
    matcher: "/admin/:path*"
}