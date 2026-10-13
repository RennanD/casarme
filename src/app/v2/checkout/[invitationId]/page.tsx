import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  buildCheckoutSummary,
  CHANGE_TEMPLATE_HREF,
  CHECKOUT_COPY,
  getCheckoutInvitation,
} from '@/src/features/create-invite'
import { HOME_CATALOG } from '@/src/features/home'
import { Button, Card } from '@/src/shared/ui'

type CheckoutPageProps = {
  params: Promise<{ invitationId: string }>
}

function resolveTemplateDisplay(templateId: string): { name: string; displayPrice: string } {
  const catalogEntry = HOME_CATALOG.find((entry) => entry.id === templateId)
  return {
    name: catalogEntry?.name ?? 'Convite',
    displayPrice: catalogEntry?.displayPrice ?? 'R$ 0,00',
  }
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { invitationId } = await params
  const invitation = await getCheckoutInvitation(invitationId)

  if (!invitation) {
    notFound()
  }

  const templateInfo = resolveTemplateDisplay(invitation.template)
  const summary = buildCheckoutSummary({
    templateName: templateInfo.name,
    displayPrice: templateInfo.displayPrice,
    brideName: invitation.brideName,
    groomName: invitation.groomName,
    email: invitation.email,
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8 px-5 py-12 lg:px-0">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            CHECKOUT
          </p>
          <h1 className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-normal tracking-tight text-foreground">
            {CHECKOUT_COPY.title}
          </h1>
          <p className="body-sm text-muted-foreground">{CHECKOUT_COPY.description}</p>
        </div>

        <Card className="gap-4 rounded-[18px] border border-border bg-card p-6 shadow-none sm:p-8">
          <h2 className="text-sm font-semibold text-foreground">{CHECKOUT_COPY.orderSummary}</h2>

          <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3.5">
            <div>
              <p className="text-[13px] font-semibold text-foreground">{summary.summaryLabel}</p>
              <p className="text-[13px] text-muted-foreground">
                {summary.brideName} & {summary.groomName}
              </p>
              <p className="text-[11px] text-muted-foreground">{summary.email}</p>
            </div>
            <p className="font-serif text-[22px] text-foreground">{summary.total}</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 dark:border-amber-900/40 dark:bg-amber-950/30">
            <p className="text-sm text-amber-900 dark:text-amber-100">{CHECKOUT_COPY.pixComingSoon}</p>
          </div>

          <Button asChild variant="ghost" className="justify-start px-0">
            <Link href={CHANGE_TEMPLATE_HREF}>{CHECKOUT_COPY.backToHome}</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
