'use client'

import { useEffect } from 'react'

type WatermarkedPreviewShellProps = {
  children: React.ReactNode
  variant?: 'compact' | 'enlarged' | 'checkout'
  className?: string
}

export function WatermarkedPreviewShell({
  children,
  className,
}: WatermarkedPreviewShellProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'PrintScreen' ||
        (event.ctrlKey && event.key === 'p') ||
        (event.metaKey && event.key === 'p')
      ) {
        event.preventDefault()
        alert(
          'Capturas de tela estão desabilitadas nesta página. Complete o pagamento para ter acesso total ao convite.',
        )
        return false
      }
    }

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault()
      return false
    }

    const handleVisibilityChange = () => {
      document.body.style.filter = document.hidden ? 'blur(20px)' : 'none'
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.body.style.filter = 'none'
    }
  }, [])

  return (
    <div className={`relative select-none ${className ?? ''}`}>
      <div className="pointer-events-none">{children}</div>

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.02) 100px,
            rgba(0, 0, 0, 0.02) 200px
          )`,
        }}
      >
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 p-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="rotate-[-45deg] transform whitespace-nowrap text-2xl font-bold text-gray-400/30 md:text-3xl"
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            >
              AGUARDANDO PAGAMENTO
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <svg className="h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
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
              <text x="0" y="20" fontSize="16" fill="#000" opacity="0.3" fontWeight="bold">
                NÃO PAGO
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#watermark-pattern)" />
        </svg>
      </div>
    </div>
  )
}
