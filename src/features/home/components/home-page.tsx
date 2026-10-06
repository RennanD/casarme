import { HOME_ANCHORS } from '@/src/features/home/model/anchors'

import { TemplateGridSection } from './template-grid-section'

export function HomePage() {
  return (
    <main id={HOME_ANCHORS.mainContent}>
      <TemplateGridSection />
    </main>
  )
}
