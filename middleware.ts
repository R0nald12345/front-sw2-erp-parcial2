import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirigir raíz a /login
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard/reporte', request.url));
  }
}

export const config = {
  matcher: ['/'],
};