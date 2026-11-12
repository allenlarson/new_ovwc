import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Locks the proposal admin (pages + API) behind a password, and keeps private pages out of search.
// The password comes from the ADMIN_PASSWORD environment variable (any username works).
// If it isn't set, the admin stays locked rather than open.

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function isAuthorized(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = request.headers.get('authorization') ?? '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const decoded = atob(header.slice(6));
    const password = decoded.slice(decoded.indexOf(':') + 1);
    return safeEqual(password, expected);
  } catch {
    return false;
  }
}

// Clients sign their proposal without logging in; everything else under /api/proposals is admin-only.
function isPublicApi(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return request.method === 'POST' && /^\/api\/proposals\/[^/]+\/sign\/?$/.test(pathname);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Client proposal pages are shared by link only: allowed, but never indexed.
  if (pathname.startsWith('/proposal/')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  if (pathname.startsWith('/api/proposals') && isPublicApi(request)) {
    return NextResponse.next();
  }

  if (!isAuthorized(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="OVWC Admin", charset="UTF-8"',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/proposals/:path*', '/api/proposals', '/proposal/:path*'],
};
