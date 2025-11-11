"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Mail, Loader2 } from "lucide-react"

interface AbandonedInvitation {
  id: string
  groomName: string
  brideName: string
  email: string
  template: string
  createdAt: string
  paymentStatus: string | null
}

export default function AbandonedCartPage() {
  const [invitations, setInvitations] = useState<AbandonedInvitation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)

  useEffect(() => {
    fetchAbandonedInvitations()
  }, [])

  const fetchAbandonedInvitations = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/abandoned-cart")
      if (!response.ok) {
        throw new Error("Erro ao buscar convites abandonados")
      }
      const data = await response.json()
      setInvitations(data.invitations)
    } catch (error) {
      console.error("Erro ao buscar convites abandonados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmail = async (invitationId: string) => {
    try {
      setSendingEmail(invitationId)
      const response = await fetch("/api/admin/abandoned-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      })

      if (!response.ok) {
        const data = await response.json()
        alert(data.error || "Erro ao enviar email")
        return
      }

      alert("Email de recuperação enviado com sucesso!")
      // Atualizar lista
      fetchAbandonedInvitations()
    } catch (error) {
      console.error("Erro ao enviar email:", error)
      alert("Erro ao enviar email. Tente novamente.")
    } finally {
      setSendingEmail(null)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR,
      })
    } catch {
      return "Data inválida"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#6B6B6B]">Carregando convites abandonados...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-[#3E3E3E]">Recuperação de Carrinho</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">
          Convites criados mas não finalizados: {invitations.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Noiva e Noivo</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-[#6B6B6B] py-8">
                  Nenhum convite abandonado encontrado
                </TableCell>
              </TableRow>
            ) : (
              invitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell className="font-medium">
                    {invitation.groomName} & {invitation.brideName}
                  </TableCell>
                  <TableCell className="text-[#6B6B6B]">{invitation.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {invitation.template}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#6B6B6B]">
                    {formatDate(invitation.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                      Não pago
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleSendEmail(invitation.id)}
                      disabled={sendingEmail === invitation.id}
                      size="sm"
                      className="bg-[#D4A373] hover:bg-[#C4936B] text-white"
                    >
                      {sendingEmail === invitation.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

