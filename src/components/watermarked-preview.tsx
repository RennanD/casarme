"use client"

import { useEffect } from "react"

interface WatermarkedPreviewProps {
  children: React.ReactNode
}

export function WatermarkedPreview({ children }: WatermarkedPreviewProps) {
  useEffect(() => {
    // Desabilitar print screen (detectar quando usuário pressiona Print Screen)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen, Ctrl+P, Cmd+P
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "p") ||
        (e.metaKey && e.key === "p")
      ) {
        e.preventDefault()
        alert("⚠️ Capturas de tela estão desabilitadas nesta página. Complete o pagamento para ter acesso total ao convite.")
        return false
      }
    }

    // Desabilitar context menu (botão direito)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Detectar quando a página perde foco (possível screenshot)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Usuário pode estar tirando screenshot
        document.body.style.filter = "blur(20px)"
      } else {
        document.body.style.filter = "none"
      }
    }

    // Adicionar event listeners
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.body.style.filter = "none"
    }
  }, [])

  return (
    <div className="relative select-none">
      {/* Conteúdo do preview */}
      <div className="pointer-events-none">
        {children}
      </div>

      {/* Marca d'água - Overlay com texto repetido */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.02) 100px,
            rgba(0, 0, 0, 0.02) 200px
          )`
        }}
      >
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="text-gray-400/30 font-bold text-2xl md:text-3xl whitespace-nowrap transform rotate-[-45deg]"
              style={{
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
            >
              AGUARDANDO PAGAMENTO
            </div>
          ))}
        </div>
      </div>

      {/* Overlay adicional para dificultar screenshot */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="watermark-pattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <text
                x="0"
                y="20"
                fontSize="16"
                fill="#000"
                opacity="0.3"
                fontWeight="bold"
              >
                NÃO PAGO
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#watermark-pattern)" />
        </svg>
      </div>

      {/* CSS inline para proteções adicionais */}
      <style jsx>{`
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
