import type { Metadata } from 'next'

import { DesignSystemShowcase } from '@/src/features/design-system'

export const metadata: Metadata = {
  title: 'Design System — CasarMe v2',
}

export default function DesignSystemPage() {
  return <DesignSystemShowcase />
}
