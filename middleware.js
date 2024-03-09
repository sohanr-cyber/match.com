// import { NextResponse } from "next/server";
import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import BASE_URL from './config'
export default function middleware (req) {
  let verify = req.cookies.get('userInfo')
  let uri = req.url

  // not logged in
  if (!verify && uri.includes('/update')) {
    return NextResponse.redirect(`${BASE_URL}/login`)
  }

  // if ((verify && uri.includes('/login')) || uri.includes('/register')) {
  //   return NextResponse.redirect(
  //     `${BASE_URL}/profile/${JSON.parse(verify.value).id}`
  //   )
  // }
}
