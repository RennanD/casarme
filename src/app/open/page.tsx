"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export default function OpenPage() {




  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center transition-opacity duration-500 opacity-100">
        <div className="mb-6">
          <Heart
            className="w-16 h-16 mx-auto text-[#D4A373] animate-pulse"
            fill="currentColor"
          />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-6">
          Para sua melhor experiência, vamos abrir o site no seu navegador preferido 🧡
        </h1>

        <div className="mt-6 transition-opacity duration-500 opacity-100">
          <a
            href="https://casarme.site?utm_source=tiktok"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D4A373] hover:bg-[#C4935F] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
          >
            Abrir Site
          </a>
        </div>
      </div>
    </div>
  )
}

