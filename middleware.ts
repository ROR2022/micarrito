import { NextResponse, NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { routing } from './i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from "next-intl/server";

const intlMiddleware = createMiddleware(routing);
export async function middleware(request: NextRequest) {
  const locale = getLocale();
  // Handle root path
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }
  // Verificar si la ruta es protegida
  const isProtectedRoute = request.nextUrl.pathname.startsWith(`/${locale}/dashboard`);

  // Create a new NextRequest instead of cloning
  const supabaseResponse = await updateSession(request);

  // Verificar autenticación
  const isAuthenticated = supabaseResponse?.headers.get('x-user-id') !== null;

  // Si es una ruta protegida y el usuario no está autenticado, redirigir a sign-in
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Create a new request with only valid RequestInit properties
  const newRequest = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
    // Remove invalid properties from RequestInit
    body: request.body,
    cache: request.cache,
    credentials: request.credentials,
    integrity: request.integrity,
    keepalive: request.keepalive,
    mode: request.mode,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    signal: request.signal,
  });

  // Copy additional properties after creation
  Object.defineProperty(newRequest, 'nextUrl', { value: request.nextUrl });
  Object.defineProperty(newRequest, 'cookies', { value: request.cookies });
  //Object.defineProperty(newRequest, 'geo', { value: request.geo });

  const intlResponse = intlMiddleware(newRequest);

  if (!supabaseResponse) {
    return intlResponse;
  }

  // Merge headers
  intlResponse.headers.forEach((value, key) => {
    supabaseResponse.headers.set(key, value);
  });

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - api routes - /api/
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
