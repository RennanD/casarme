import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/src/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()

  // Permitir rotas de callback do NextAuth
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // Se estiver logado e tentar acessar /login, redirecionar para /admin
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // Proteger rotas /admin/**
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/auth/:path*"],
}

