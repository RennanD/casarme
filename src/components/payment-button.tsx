
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PaymentButtonProps {
  invitationId: string
}

export function PaymentButton({ invitationId }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      // Tentar recuperar CPF do localStorage se houver (opcional)
      // Como é client-side, podemos acessar localStorage
      const savedCpf = localStorage.getItem('user_cpf') || '' // Fallback vazio se não tiver

      const response = await fetch("/api/payments/create-billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitationId: invitationId,
          cpf: savedCpf
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao iniciar pagamento")
      }

      const data = await response.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error("URL de checkout não retornada")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-[#00A868] hover:bg-[#008F5A] text-white text-lg py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processando...
        </>
      ) : (
        "Finalizar Pagamento"
      )}
    </Button>
  )
}
