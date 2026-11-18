import { EXTENDED_TEMPLATE_SLUGS } from '@/src/shared/catalog'

import type { TemplateBranch } from './types'

const LEGACY_TEMPLATE_IDS = new Set(['blue', 'golden', 'garden', 'romantic'])

const EXTENDED_TEMPLATE_BRANCHES = new Map<string, TemplateBranch>(
  EXTENDED_TEMPLATE_SLUGS.map((slug) => [slug, slug as TemplateBranch]),
)

export function resolveTemplateBranch(templateId: string): TemplateBranch {
  if (LEGACY_TEMPLATE_IDS.has(templateId)) {
    return templateId as TemplateBranch
  }

  const extendedBranch = EXTENDED_TEMPLATE_BRANCHES.get(templateId)
  if (extendedBranch) {
    return extendedBranch
  }

  if (templateId === 'modern') {
    return 'modern'
  }

  return 'fallback'
}
