'use client'

import { Music2, Pause, Play } from 'lucide-react'

import { Button } from '@/src/components/ui/button'

import { useInviteMusic } from '../../hooks/use-invite-music'
import type { ExtendedInviteTheme } from '../../model/themes/extended-invite-theme'
import type { RomanticTheme } from '../../model/themes/romantic-theme'
import { ROMANTIC_THEME } from '../../model/themes/romantic-theme'
import type { RosaFloridoTheme } from '../../model/themes/rosa-florido-theme'

type MusicPlayerTheme =
  | { variant: 'romantic'; tokens?: RomanticTheme }
  | { variant: 'rosa'; tokens: RosaFloridoTheme }
  | { variant: 'extended'; tokens: ExtendedInviteTheme }

type MusicPlacement = 'bottom-center' | 'top-right' | 'top-left'

type InviteMusicPlayerProps = {
  musicUrl?: string
  theme?: MusicPlayerTheme
  placement?: MusicPlacement
}

export function InviteMusicPlayer({
  musicUrl,
  theme = { variant: 'romantic', tokens: ROMANTIC_THEME },
  placement = 'top-right',
}: InviteMusicPlayerProps) {
  const { enabled, isPlaying, hasUserInteracted, videoId, toggle } = useInviteMusic(musicUrl)

  if (!enabled) return null

  if (theme.variant === 'rosa' || theme.variant === 'extended') {
    const tokens = theme.tokens
    const placementClass =
      placement === 'bottom-center'
        ? 'bottom-6 left-1/2 z-20 -translate-x-1/2'
        : placement === 'top-left'
          ? 'left-4 top-4 z-20'
          : 'right-4 top-4 z-20'

    const buttonSize =
      placement === 'bottom-center' ? 'size-14' : placement === 'top-left' ? 'size-11' : 'size-12'

    return (
      <>
        <div className={`absolute flex flex-col items-center gap-2 ${placementClass}`}>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
            className={`flex ${buttonSize} items-center justify-center rounded-full text-white shadow-lg transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100`}
            style={{ backgroundColor: tokens.accent }}
          >
            {isPlaying ? <Pause className="size-[18px]" /> : <Music2 className="size-[18px]" />}
          </button>
          {placement === 'bottom-center' && (
            <span
              className="text-[9px] tracking-[0.35em]"
              style={{ color: tokens.accent, fontFamily: tokens.fontSans }}
            >
              T o c a r m ú s i c a
            </span>
          )}
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
