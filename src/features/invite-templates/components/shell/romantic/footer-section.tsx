import Link from 'next/link'
import { Heart } from 'lucide-react'

import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'

type RomanticFooterSectionProps = {
  groomName: string
  brideName: string
}

export function RomanticFooterSection({ groomName, brideName }: RomanticFooterSectionProps) {
  return (
    <footer
      className="py-8 text-center text-white"
      style={{
        background: `linear-gradient(to bottom, ${ROMANTIC_THEME.bgGradient}, ${ROMANTIC_THEME.accent})`,
      }}
    >
      <p className="mb-4">
        Feito com <Heart className="inline size-4 fill-current" /> por {groomName || 'Noivo'} &{' '}
        {brideName || 'Noiva'}
      </p>
      <Link href="/criar" className="text-sm text-white/80 hover:text-white">
        Crie seu convite com CasarMe
      </Link>
    </footer>
  )
}
