import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Récupérer le cookie
  const authCookie = request.cookies.get('site_access')
  const { pathname } = request.nextUrl

  // Liste des chemins publics (Login, API, Images, Fichiers statiques)
  const isPublicPath = 
    pathname === '/login' || 
    pathname.startsWith('/api/') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/images') ||
    pathname.includes('favicon.ico');

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
  if (!authCookie && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si l'utilisateur est connecté et essaie d'aller sur login, on le renvoie à l'accueil
  if (authCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
