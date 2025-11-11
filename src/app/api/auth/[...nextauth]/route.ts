import { handlers } from "@/src/lib/auth"

// Configurar AUTH_URL dinamicamente se não estiver definida
if (!process.env.AUTH_URL) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const host = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, "") || "localhost:3000"
  process.env.AUTH_URL = `${protocol}://${host}`
}

export const { GET, POST } = handlers
