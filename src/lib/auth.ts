import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/src/lib/prisma"

// Validar variáveis de ambiente necessárias
if (!process.env.AUTH_SECRET) {
  console.error("❌ AUTH_SECRET não está configurada")
  throw new Error("AUTH_SECRET não está configurada")
}

if (!process.env.AUTH_RESEND_KEY && !process.env.RESEND_API_KEY) {
  console.error("❌ AUTH_RESEND_KEY ou RESEND_API_KEY deve estar configurada")
  throw new Error("AUTH_RESEND_KEY ou RESEND_API_KEY deve estar configurada")
}

if (!process.env.RESEND_FROM_EMAIL) {
  console.error("❌ RESEND_FROM_EMAIL não está configurada")
  throw new Error("RESEND_FROM_EMAIL não está configurada")
}

// Log de configuração (apenas em desenvolvimento)
if (process.env.NODE_ENV === "development") {
}

// Verificar se o adapter está funcionando
let adapter
try {
  adapter = PrismaAdapter(prisma)
} catch (error) {
  console.error("❌ Erro ao inicializar PrismaAdapter:", error)
  throw error
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  debug: process.env.NODE_ENV === "development", // Ativar debug em desenvolvimento
  session: {
    strategy: "jwt", // Usar JWT ao invés de database para evitar problemas com adapter
  },
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Validação adicional quando o usuário clica no link
      const adminEmail = process.env.ADMIN_EMAIL

      if (!adminEmail) {
        console.error("ADMIN_EMAIL não configurado")
        return false
      }

      if (user?.email !== adminEmail) {
        console.warn(`Tentativa de login com email não autorizado: ${user?.email}`)
        return false
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      // Após login bem-sucedido, redirecionar para /admin
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/admin`
      }
      // Se a URL for relativa, redirecionar para /admin
      if (url.startsWith("/")) {
        return `${baseUrl}/admin`
      }
      // Caso padrão: redirecionar para /admin
      return `${baseUrl}/admin`
    },
    async session({ session, token }) {
      // Garantir que session.user existe
      if (!session.user) {
        session.user = {} as any
      }
      // Atualizar email do token se disponível
      if (token?.email) {
        session.user.email = token.email as string
      }
      return session
    },
    async jwt({ token, user, trigger }) {
      // Inicializar token.email se não existir
      if (!token.email && user?.email) {
        token.email = user.email
      }
      // Garantir que sempre retornamos o token
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true, // Necessário para NextAuth v5 funcionar corretamente
})

