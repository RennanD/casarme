"use client"

import { Button } from "@/src/components/ui/button"
import { ArrowDown } from "lucide-react"

interface MobileCTAButtonProps {
  templatePlan: "Básico" | "Pro"
  templateName: string
}

export function MobileCTAButton({ templatePlan, templateName }: MobileCTAButtonProps) {
  const handleClick = () => {
    const formSection = document.getElementById("form-section")
    formSection?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleClick}
        size="lg"
        className={`w-full max-w-md ${
          templatePlan === "Pro"
            ? "bg-[#D4A373] text-white hover:bg-[#C49363]"
            : "bg-[#8B9D7F] text-white hover:bg-[#7A8C70]"
        }`}
      >
        Criar Meu Convite Agora
        <ArrowDown className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}

