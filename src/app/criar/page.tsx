import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import CreateInvitationClient from "./create-invitation-client"

export const metadata: Metadata = {
  title: "Criar Convite de Casamento Digital - CasarMe",
  description: "Crie seu convite de casamento digital personalizado em poucos minutos. Escolha entre nossos templates elegantes e personalize cada detalhe.",
  openGraph: {
    title: "Criar Convite de Casamento Digital - CasarMe",
    description: "Crie seu convite de casamento digital personalizado em poucos minutos. Escolha entre nossos templates elegantes e personalize cada detalhe.",
    type: "website",
  },
}

interface PageProps {
  searchParams: { template?: string }
}

export default function CreateInvitationPage({ searchParams }: PageProps) {
  const selectedTemplateId = searchParams.template

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4A373] hover:text-[#C49363] mb-8">
          <ArrowLeft className="w-5 h-5" />
          Voltar para home
        </Link>

        <CreateInvitationClient selectedTemplateId={selectedTemplateId} />
      </div>
    </div>
  )
}
