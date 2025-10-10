"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CreateInviteForm from "./sections/create-invite-form"
import EmailModal from "./sections/email-modal"
import { useRouter } from "next/navigation"

export default function CreateInvitationPage() {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = (email: string) => {
    setShowEmailModal(true)
  }

  const handleEmailConfirm = (email: string) => {
    // Generate a unique ID for the invitation
    const invitationId = Math.random().toString(36).substring(2, 9)

    // Simulate creating the invitation and sending email
    console.log(`Creating invitation ${invitationId} for email: ${email}`)

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

        <CreateInviteForm onEmailSubmit={handleEmailSubmit} />

        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleEmailConfirm}
        />
      </div>
    </div>
  )
}
