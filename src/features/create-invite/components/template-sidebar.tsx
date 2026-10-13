import Image from 'next/image'

import {
  INVITE_FEATURE_LIST,
  PLANNER_ADDON_DISPLAY,
  type CreateInviteTemplate,
} from '@/src/features/create-invite/model/catalog'
import {
  CHANGE_TEMPLATE_HREF,
  CREATE_INVITE_ACTIONS,
  SIDEBAR_COPY,
} from '@/src/features/create-invite/model/copy'
import { Card, Link } from '@/src/shared/ui'

type TemplateSidebarProps = {
  template: CreateInviteTemplate
}

export function TemplateSidebar({ template }: TemplateSidebarProps) {
  return (
    <aside>
      <Card className="gap-4 rounded-[18px] border border-border bg-card p-6 shadow-none">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background">
          <Image
            src={template.imagePath}
            alt={`Prévia do convite ${template.name}`}
            fill
            className="object-contain outline outline-1 -outline-offset-1 outline-black/10"
            sizes="(max-width: 1024px) 100vw, 380px"
            priority
          />
        </figure>

        <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {SIDEBAR_COPY.modelEyebrow}
        </p>
        <h2 className="font-serif text-[25px] font-normal text-foreground">{template.name}</h2>
        <p className="text-[13px] font-semibold text-foreground">
          {SIDEBAR_COPY.oneTimePayment} · {template.displayPrice}
        </p>

        <Link
          href={CHANGE_TEMPLATE_HREF}
          variant="muted"
          className="text-xs no-underline hover:no-underline"
        >
          ← {CREATE_INVITE_ACTIONS.changeTemplate}
        </Link>

        <div className="pt-1">
          <h3 className="text-[13px] font-semibold text-foreground">
            {SIDEBAR_COPY.featuresTitle}
          </h3>
          <ul className="mt-2 space-y-0.5 text-xs leading-relaxed text-muted-foreground">
            {INVITE_FEATURE_LIST.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </div>

        <p className="sr-only">Planner opcional disponível por {PLANNER_ADDON_DISPLAY}</p>
      </Card>
    </aside>
  )
}
