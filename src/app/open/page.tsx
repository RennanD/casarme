"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { detectBrowser } from "@/src/lib/detect-browser"

export default function OpenPage() {
  const [browserName, setBrowserName] = useState<string>("")
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent
      const browser = detectBrowser(userAgent)
      setBrowserName(browser)
      setShowContent(true)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className={`text-center transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <div className="mb-6">
          <Heart
            className="w-16 h-16 mx-auto text-[#D4A373] animate-pulse"
            fill="currentColor"
          />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-4">
          Para sua melhor experiência, vamos abrir o site no seu navegador preferido 🧡
        </h1>

        {browserName && (
          <div className="mb-6">
            <p className="text-sm text-[#6B6B6B]">
              Você está usando: <span className="font-semibold text-[#D4A373]">{browserName}</span>
            </p>
          </div>
        )}

        <div className="mt-6 transition-opacity duration-500 opacity-100">
          <a
            href="https://casarme.site?utm_source=tiktok"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#D4A373] hover:bg-[#C4935F] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
          >
            Abrir Site
          </a>
        </div>
      </div>
    </div>
  )
}

