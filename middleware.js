import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

 
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  
  const hasSession = 
    request.cookies.has('better-auth.session_token') ||
    request.cookies.has('__Secure-better-auth.session_token') ||
    request.cookies.has('better-auth.session_data');

  if (pathname === '/my-profile' && !hasSession) {
    return NextResponse.redirect(new URL('/login?redirect=/my-profile', request.url));
  }

  if ((pathname === '/login' || pathname === '/register') && hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};