import type { Metadata } from 'next'

import { DesignSystemShowcase } from '@/src/features/design-system'

export const metadata: Metadata = {
  title: 'Design System — CasarMe',
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return <DesignSystemShowcase />
}
