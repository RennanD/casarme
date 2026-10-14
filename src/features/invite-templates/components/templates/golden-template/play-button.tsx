"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"
import { useState } from "react"

export function PlayButton({ musicUrl }: { musicUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)


  const getYouTubeId = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
    )?.[1]
    return videoId
  }

  return (
    <>
      {hasUserInteracted && getYouTubeId(musicUrl) && (
        <div className="absolute -top-1 -left-1 w-1 h-1 opacity-0 pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(musicUrl)}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${getYouTubeId(musicUrl)}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full"
            title="Background Music"
          />
        </div>
      )}

      <Button
        onClick={() => {
          setIsPlaying(!isPlaying)
          setHasUserInteracted(true)
        }}
        size="lg"
        className={`bg-[#947644] flex items-center justify-center text-white h-12 w-12 rounded-full`}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" />
        )}
      </Button>
    </>

  )
}