import Link from 'next/link'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'

type ExtendedFooterProps = {
  groomName: string
  brideName: string
  theme: ExtendedInviteTheme
}

export function ExtendedFooter({ groomName, brideName, theme }: ExtendedFooterProps) {
  const groomInitial = groomName?.charAt(0)?.toUpperCase() ?? 'N'
  const brideInitial = brideName?.charAt(0)?.toUpperCase() ?? 'N'

  return (
    <footer
      className="flex flex-col items-center gap-2 px-7 pb-14 pt-10"
      style={{ backgroundColor: theme.surface }}
    >
      <p
        className="text-center text-base italic leading-[26px]"
        style={{ fontFamily: theme.fontSerif }}
      >
        {theme.footerMessage ?? 'Esperamos contar com sua presença neste dia tão especial.'}
      </p>
      <p
        className="text-[10px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        Feito com{' '}
        <Link href="/criar" className="underline-offset-2 hover:underline">
          CasarMe
        </Link>
      </p>
      <p
        className="text-[8px] tracking-[0.2px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        {groomInitial} · {brideInitial}
      </p>
    </footer>
  )
}
