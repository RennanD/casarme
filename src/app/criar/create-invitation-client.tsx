"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CreateInviteForm from "./sections/create-invite-form"
import EmailModal from "./sections/email-modal"

interface CreateInvitationClientProps {
  selectedTemplateId?: string
}

export default function CreateInvitationClient({ selectedTemplateId }: CreateInvitationClientProps) {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const router = useRouter()

  const handleEmailSubmit = (email: string, data: any) => {
    setFormData(data)
    setShowEmailModal(true)
  }

  const handleEmailConfirm = (email: string) => {
    // Redirect to thank you page
    router.push("/criar/obrigado")
  }

  return (
    <div className="relative">
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4A373] hover:text-[#B8935F] font-medium">
            ← Voltar ao CasarMe
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Criar Convite</span>
          </div>
        </div>
      </div>

      {/* Conteúdo com padding para o header fixo */}
      <div className="pt-16">
        <CreateInviteForm onEmailSubmit={handleEmailSubmit} selectedTemplateId={selectedTemplateId} />

        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailConfirm}
          formData={formData}
        />
      </div>
    </div>
  )
}
