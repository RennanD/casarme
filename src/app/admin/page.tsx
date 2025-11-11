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
import { MoreHorizontal } from "lucide-react"

interface Invitation {
  id: string
  brideName: string
  groomName: string
  email: string
  isActive: boolean
  createdAt: string
}

export default function AdminPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch("/api/admin/invitations")
        if (!response.ok) {
          throw new Error("Erro ao buscar convites")
        }
        const data = await response.json()
        setInvitations(data.invitations)
      } catch (error) {
        console.error("Erro ao buscar convites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvitations()
  }, [])

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
        <p className="text-[#6B6B6B]">Carregando convites...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-[#3E3E3E]">Convites Criados</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">
          Total: {invitations.length} convite{invitations.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ativo</TableHead>
              <TableHead>Noiva e Noivo</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-[#6B6B6B] py-8">
                  Nenhum convite encontrado
                </TableCell>
              </TableRow>
            ) : (
              invitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell>
                    <Badge
                      className={
                        invitation.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200"
                      }
                    >
                      {invitation.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {invitation.brideName} & {invitation.groomName}
                  </TableCell>
                  <TableCell className="text-[#6B6B6B]">{invitation.email}</TableCell>
                  <TableCell className="text-[#6B6B6B]">
                    {formatDate(invitation.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled
                    >
                      <MoreHorizontal className="h-4 w-4" />
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

