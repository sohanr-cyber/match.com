import { NextResponse } from 'next/server'

export default function middleware (req) {
  if (req.nextUrl.pathname.startsWith('/profile/update/') && !req.cookies.get('userInfo')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}
