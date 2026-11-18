'use client'

import { useEffect, useState } from 'react'

export type CountdownValues = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const EMPTY_COUNTDOWN: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

export function useCountdown(weddingDate: string, weddingTime?: string): CountdownValues {
  const [timeLeft, setTimeLeft] = useState<CountdownValues>(EMPTY_COUNTDOWN)

  useEffect(() => {
    if (!weddingDate) return

    const calculateTimeLeft = () => {
      const weddingDateTime = new Date(`${weddingDate}T${weddingTime || '00:00'}`)
      const difference = weddingDateTime.getTime() - Date.now()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft(EMPTY_COUNTDOWN)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [weddingDate, weddingTime])

  return timeLeft
}
