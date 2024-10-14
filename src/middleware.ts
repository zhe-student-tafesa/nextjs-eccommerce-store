
import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

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
    //return Promise.resolve(false)
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")
    if (authHeader == null)
        return Promise.resolve(false)

    // decrypt: username password
    // console.log("authHeader:", authHeader) //  Basic MTIzNDU6YWFiYg==
    // so index of MTIzNDU6YWFiYg==  is 1: authHeader.split(" ")[1]
    //  username:password, so use .split(":")
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":")
    // console.log("username:", username)
    // console.log("password:", password)
    return username === process.env.ADMIN_USER_NAME &&
        (await isValidPassword(password, process.env.ADMIN_HASHED_PASSWORD))
}


export const config = {
    matcher: "/admin/:path*"
}