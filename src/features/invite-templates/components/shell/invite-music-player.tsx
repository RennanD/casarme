'use client'

import { Music2, Pause, Play } from 'lucide-react'

import { Button } from '@/src/components/ui/button'

import { useInviteMusic } from '../../hooks/use-invite-music'
import type { RomanticTheme } from '../../model/themes/romantic-theme'
import { ROMANTIC_THEME } from '../../model/themes/romantic-theme'
import type { RosaFloridoTheme } from '../../model/themes/rosa-florido-theme'

type MusicPlayerTheme =
  | { variant: 'romantic'; tokens?: RomanticTheme }
  | { variant: 'rosa'; tokens: RosaFloridoTheme }

type InviteMusicPlayerProps = {
  musicUrl?: string
  theme?: MusicPlayerTheme
}

export function InviteMusicPlayer({
  musicUrl,
  theme = { variant: 'romantic', tokens: ROMANTIC_THEME },
}: InviteMusicPlayerProps) {
  const { enabled, isPlaying, hasUserInteracted, videoId, toggle } = useInviteMusic(musicUrl)

  if (!enabled) return null

  if (theme.variant === 'rosa') {
    const tokens = theme.tokens
    return (
      <>
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          className="absolute right-4 top-4 z-20 flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
          style={{ backgroundColor: tokens.accent }}
        >
          {isPlaying ? <Pause className="size-[18px]" /> : <Music2 className="size-[18px]" />}
        </button>
        {hasUserInteracted && videoId && (
          <div className="pointer-events-none absolute -left-1 -top-1 size-px opacity-0">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
              allow="autoplay; encrypted-media"
              className="size-full"
              title="Background Music"
            />
          </div>
        )}
      </>
    )
  }

  const tokens = theme.tokens ?? ROMANTIC_THEME

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end gap-2">
        {isPlaying && (
          <div
            className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-lg backdrop-blur-sm"
            style={{ color: tokens.text }}
          >
            🎵 Tocando
          </div>
        )}
        {!hasUserInteracted && (
          <div
            className="max-w-32 rounded-full bg-white/90 px-3 py-1 text-center text-xs font-medium shadow-lg backdrop-blur-sm"
            style={{ color: tokens.text }}
          >
            Toque para tocar música
          </div>
        )}
        <Button
          onClick={toggle}
          size="lg"
          className="size-16 rounded-full text-white shadow-2xl transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
          style={{
            backgroundColor: isPlaying ? tokens.accentHover : tokens.accent,
          }}
        >
          {isPlaying ? <Pause className="size-6" /> : <Play className="ml-0.5 size-6" />}
        </Button>
      </div>
      {hasUserInteracted && videoId && (
        <div className="pointer-events-none absolute -left-1 -top-1 size-px opacity-0">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            className="size-full"
            title="Background Music"
          />
        </div>
      )}
    </div>
  )
}
