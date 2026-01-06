"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CreateInviteForm from "@/src/app/criar/sections/create-invite-form"
import EmailModal from "@/src/app/criar/sections/email-modal"

interface CreateInvitationFormWrapperProps {
  selectedTemplateId: string
}

export default function CreateInvitationFormWrapper({
  selectedTemplateId,
}: CreateInvitationFormWrapperProps) {
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
      <CreateInviteForm 
        onEmailSubmit={handleEmailSubmit} 
        selectedTemplateId={selectedTemplateId}
        hideTemplateSelection={true}
      />

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailConfirm}
        formData={formData}
      />
    </>
  )
}

