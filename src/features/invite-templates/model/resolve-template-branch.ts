import type { TemplateBranch } from './types'

const CATALOG_TEMPLATE_IDS = new Set(['blue', 'golden', 'garden', 'romantic'])

export function resolveTemplateBranch(templateId: string): TemplateBranch {
  if (CATALOG_TEMPLATE_IDS.has(templateId)) {
    return templateId as TemplateBranch
  }

  if (templateId === 'modern') {
    return 'modern'
  }

  return 'fallback'
}
