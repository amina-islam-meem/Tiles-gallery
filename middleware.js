import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Better Auth v0.7 uses these cookies
  const hasSession = 
    request.cookies.has('better-auth.session_token') ||
    request.cookies.has('__Secure-better-auth.session_token') ||
    request.cookies.has('better-auth.session_data');

  // Public routes
  const isPublic = ['/', '/all-tiles', '/login', '/register'].includes(pathname) || 
                   pathname.startsWith('/tile/') ||
                   pathname.startsWith('/api/');

  // Protect /my-profile
  if (pathname === '/my-profile' && !hasSession) {
    return NextResponse.redirect(new URL('/login?redirect=/my-profile', request.url));
  }

  // Redirect logged-in users from auth pages
  if ((pathname === '/login' || pathname === '/register') && hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};