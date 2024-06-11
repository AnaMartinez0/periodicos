import { NextResponse } from "next/server";

export async function middleware(req) {
    const verify = req.cookies.get('login')
    const url = req.url

    if (!verify && (url.includes('/home', '/nosotros', '/upload', '/[id]') || url.includes('/nosotros') || url.includes('/upload') || url.includes('/[id]') || url.includes('/user') || url.includes('/cart'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (verify && url === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

}