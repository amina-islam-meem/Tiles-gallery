import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Check for session in cookies
  const session = request.cookies.get('tilegallery_session') || 
                   request.cookies.get('better-auth.session');
  
  const { pathname } = request.nextUrl;
  
  // Define public and private routes
  const publicPaths = ['/', '/all-tiles', '/login', '/register'];
  const isPublicPath = publicPaths.includes(pathname);
  const isTilePath = pathname.startsWith('/tile/');
  
  // Protected routes require authentication
  if ((isTilePath || pathname === '/my-profile') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Already logged in users can't access login/register
  if ((pathname === '/login' || pathname === '/register') && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};