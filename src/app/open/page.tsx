"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { isTikTokBrowser } from "@/src/lib/is-tiktok"

export default function OpenPage() {
  const [isTikTok, setIsTikTok] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if running on client side
    if (typeof window === "undefined") return

    const userAgent = navigator.userAgent
    const isTikTokUser = isTikTokBrowser(userAgent)

    if (isTikTokUser) {
      setIsTikTok(true)
      // Fade in animation
      setTimeout(() => setShowContent(true), 100)

      // Redirect after 3 seconds
      const redirectTimer = setTimeout(() => {
        window.location.href = "https://casarme.site"
      }, 3000)

      return () => clearTimeout(redirectTimer)
    } else {
      // Immediate redirect for non-TikTok browsers
      window.location.href = "https://casarme.site"
    }
  }, [])

  // If not TikTok, don't render anything (will redirect immediately)
  if (!isTikTok) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        className={`text-center transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="mb-6">
          <Heart
            className="w-16 h-16 mx-auto text-[#D4A373] animate-pulse"
            fill="currentColor"
          />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-2">
          Estamos abrindo o site no seu navegador 💌
        </h1>
      </div>
    </div>
  )
}

