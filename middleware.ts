import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function sha256(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login API is public
  if (pathname === '/api/admin/login') return NextResponse.next();

  const cookie = request.cookies.get('admin_session')?.value;
  const pwd = process.env.ADMIN_PASSWORD ?? '';
  const expected = pwd ? await sha256(pwd) : '';
  const isAuthenticated = expected !== '' && cookie === expected;

  // Admin UI login page
  if (pathname === '/admin') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // All other /admin/* and /api/admin/*
  if (!isAuthenticated) {
    if (pathname.startsWith('/api/admin/')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
