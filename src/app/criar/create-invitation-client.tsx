"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    <>
      <CreateInviteForm onEmailSubmit={handleEmailSubmit} selectedTemplateId={selectedTemplateId} />

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailConfirm}
        formData={formData}
      />
    </>
  )
}
