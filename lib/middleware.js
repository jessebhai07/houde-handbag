// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // 1. Try to get the token from cookies
  const token = request.cookies.get('token')?.value // Change 'token' to whatever your cookie name is

  // 2. Define protected routes
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  
  // 3. Logic: If trying to access dashboard but no token, redirect to login
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 4. (Optional) If user is already logged in but goes to /login, redirect to dashboard
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}