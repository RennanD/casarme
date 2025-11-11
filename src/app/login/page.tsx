"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Heart } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      // Validar email antes de enviar
      const response = await fetch("/api/auth/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        setMessage({
          type: "error",
          text: data.error || "Este email não está autorizado a acessar o painel admin.",
        })
        setIsLoading(false)
        return
      }

      const result = await signIn("resend", {
        email,
        redirect: false,
      })

      if (result?.error) {
        console.error("Erro no signIn:", result.error)
        setMessage({
          type: "error",
          text: result.error === "AccessDenied" 
            ? "Este email não está autorizado a acessar o painel admin."
            : result.error === "Configuration"
            ? "Erro de configuração. Verifique as variáveis de ambiente."
            : `Erro ao enviar magic link: ${result.error}`,
        })
      } else if (result?.ok) {
        setMessage({
          type: "success",
          text: "Magic link enviado! Verifique seu email e clique no link para acessar.",
        })
        setEmail("")
      } else {
        // Caso não tenha erro nem sucesso explícito, considerar sucesso
        setMessage({
          type: "success",
          text: "Magic link enviado! Verifique seu email e clique no link para acessar.",
        })
        setEmail("")
      }
    } catch (error) {
      console.error("Erro no login:", error)
      setMessage({
        type: "error",
        text: error instanceof Error 
          ? `Erro: ${error.message}`
          : "Erro ao processar solicitação. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-[#D4A373] fill-current" />
          <span className="font-serif text-3xl text-[#3E3E3E]" style={{ fontFamily: "Playfair Display" }}>
            CasarMe
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#3E3E3E] mb-2 text-center">
          Acesso Admin
        </h1>
        <p className="text-[#6B6B6B] mb-6 text-center text-sm">
          Digite seu email para receber um link de acesso
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D4A373] hover:bg-[#C4936B] text-white"
          >
            {isLoading ? "Enviando..." : "Enviar Magic Link"}
          </Button>
        </form>
      </div>
    </div>
  )
}

