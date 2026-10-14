import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from '@/src/lib/auth'

function resolveLegacyRedirect(pathname: string): string | null {
  if (pathname === '/v2' || pathname === '/v2/') {
    return '/'
  }

  if (pathname === '/v2/design-system' || pathname === '/v2/design-system/') {
    return '/design-system'
  }

  if (pathname.startsWith('/v2/criar/')) {
    return pathname.replace('/v2/criar/', '/criar/')
  }

  if (pathname.startsWith('/v2/checkout/')) {
    return pathname.replace('/v2/checkout/', '/checkout/')
  }

  if (pathname.startsWith('/v2/obrigado/')) {
    return pathname.replace('/v2/obrigado/', '/obrigado/')
  }

  if (pathname.startsWith('/exemplo/')) {
    const slug = pathname.slice('/exemplo/'.length).split('/')[0]
    return slug ? `/demo/${slug}` : '/'
  }

  if (pathname === '/criar' || pathname === '/criar/') {
    return '/'
  }

  if (pathname.startsWith('/modelo/') || pathname.startsWith('/modelos/')) {
    return '/'
  }

  return null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const legacyTarget = resolveLegacyRedirect(pathname)
  if (legacyTarget) {
    const target = request.nextUrl.clone()
    target.pathname = legacyTarget
    target.search = request.nextUrl.search
    return NextResponse.redirect(target, 301)
  }

  const session = await auth()

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/api/auth/:path*',
    '/v2',
    '/v2/:path*',
    '/exemplo/:path*',
    '/criar',
    '/modelo/:path*',
    '/modelos/:path*',
  ],
}
