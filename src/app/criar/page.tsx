"use client"

import { useState, Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CreateInviteForm from "./sections/create-invite-form"
import EmailModal from "./sections/email-modal"
import { useRouter, useSearchParams } from "next/navigation"

function CreateInvitationContent() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTemplateId = searchParams.get('template')

  const handleEmailSubmit = (email: string, data: any) => {
    setFormData(data)
    setShowEmailModal(true)
  }

  const handleEmailConfirm = (email: string) => {
    // Redirect to thank you page
    router.push("/criar/obrigado")
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4A373] hover:text-[#C49363] mb-8">
          <ArrowLeft className="w-5 h-5" />
          Voltar para home
        </Link>

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

export default function CreateInvitationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#D4A373] border-r-transparent mb-4"></div>
          <p className="text-[#3E3E3E] font-serif">Carregando...</p>
        </div>
      </div>
    }>
      <CreateInvitationContent />
    </Suspense>
  )
}
