'use client'

import { useEffect, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type { CreateInviteTemplate } from '@/src/features/create-invite/model/catalog'
import { getDefaultValuesForTemplate } from '@/src/features/create-invite/model/defaults'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'

const DRAFT_KEY_PREFIX = 'casarme:draft:v2'
const SAVE_DEBOUNCE_MS = 400

export function getDraftStorageKey(slug: string): string {
  return `${DRAFT_KEY_PREFIX}:${slug}`
}

export function readCreateInviteDraft(
  template: Pick<CreateInviteTemplate, 'slug'>,
): CreateInviteFormValues | null {
  if (typeof window === 'undefined') return null

  const baseDefaults = getDefaultValuesForTemplate(template)

  try {
    const raw = window.localStorage.getItem(getDraftStorageKey(template.slug))
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<CreateInviteFormValues>
    return {
      ...baseDefaults,
      ...parsed,
      images: {
        ...baseDefaults.images,
        ...parsed.images,
        gallery: parsed.images?.gallery ?? [],
      },
    }
  } catch {
    return null
  }
}

export function clearCreateInviteDraft(slug: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(getDraftStorageKey(slug))
}

export function useCreateInviteDraft(
  template: Pick<CreateInviteTemplate, 'slug'>,
  methods: UseFormReturn<CreateInviteFormValues>,
): void {
  const hydratedRef = useRef(false)

  useEffect(() => {
    const draft = readCreateInviteDraft(template)
    if (draft) {
      methods.reset(draft)
    } else {
      methods.reset(getDefaultValuesForTemplate(template))
    }
    hydratedRef.current = true
  }, [methods, template])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const subscription = methods.watch((values) => {
      if (!hydratedRef.current) return

      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        window.localStorage.setItem(
          getDraftStorageKey(template.slug),
          JSON.stringify(values),
        )
      }, SAVE_DEBOUNCE_MS)
    })

    return () => {
      subscription.unsubscribe()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [methods, template])
}
