'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'

import { Button, Card } from '@/src/shared/ui'

import { THANK_YOU_COPY } from '../model/copy'

type ThankYouClientProps = {
  invitationUrl: string
  email: string
}

export function ThankYouClient({ invitationUrl, email }: ThankYouClientProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [invitationUrl])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {THANK_YOU_COPY.eyebrow}
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
            {THANK_YOU_COPY.title}
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">{THANK_YOU_COPY.description}</p>
        </div>

        <Card className="gap-5 rounded-2xl border border-border bg-card p-6 shadow-none sm:p-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{THANK_YOU_COPY.inviteLinkLabel}</p>
            <p className="break-all rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground">
              {invitationUrl}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleCopy}>
              {copied ? THANK_YOU_COPY.copied : THANK_YOU_COPY.copyLink}
            </Button>
            <Button asChild variant="outline">
              <Link href={invitationUrl} target="_blank" rel="noopener noreferrer">
                {THANK_YOU_COPY.openInvite}
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">{THANK_YOU_COPY.emailNote(email)}</p>
        </Card>
      </div>
    </div>
  )
}
