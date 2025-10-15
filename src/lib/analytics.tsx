"use client"

import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function GoogleTagManagerScripts() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      sendGTMEvent({ event: "pageview", page: pathname })
    }
  }, [pathname, searchParams])

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null
  }

  return (
    <>
      <noscript>
        <iframe
          height="0"
          title="GTM"
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          style={{ display: "none", visibility: "hidden" }}
          width="0"
        />
      </noscript>
      <GoogleTagManager gtmId={GTM_ID!} />
    </>
  )
}
