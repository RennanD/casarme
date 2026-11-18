'use client'

import { useState } from 'react'

import { getYouTubeId } from '../model/youtube'

export function useInviteMusic(musicUrl?: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const videoId = musicUrl ? getYouTubeId(musicUrl) : undefined

  const toggle = () => {
    setHasUserInteracted(true)
    setIsPlaying((current) => !current)
  }

  return {
    isPlaying,
    hasUserInteracted,
    videoId,
    toggle,
    enabled: Boolean(musicUrl && videoId),
  }
}
