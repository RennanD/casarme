import { isExtendedTemplateSlug } from '@/src/shared/catalog'

import type { TemplateBranch } from './types'

const LEGACY_TEMPLATE_IDS = new Set(['blue', 'golden', 'garden', 'romantic'])

export function resolveTemplateBranch(templateId: string): TemplateBranch {
  if (LEGACY_TEMPLATE_IDS.has(templateId)) {
    return templateId as TemplateBranch
  }

  if (templateId === 'rosa') {
    return 'rosa'
  }

  if (isExtendedTemplateSlug(templateId)) {
    return 'romantic'
  }

  if (templateId === 'modern') {
    return 'modern'
  }

  return 'fallback'
}
