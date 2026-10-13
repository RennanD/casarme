'use client'

import { useFormContext } from 'react-hook-form'

import {
  CEREMONY_STEP_FIELDS,
  CREATE_INVITE_ACTIONS,
  CREATE_INVITE_FORM_COPY,
} from '@/src/features/create-invite/model/copy'
import { maskWhatsApp } from '@/src/features/create-invite/model/masks'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import { Button, Input } from '@/src/shared/ui'

import { FormFieldGroup } from './form-field-group'

const borderlessInputClass =
  'h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0'

type CeremonyStepFormProps = {
  onContinue: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function CeremonyStepForm({ onContinue, onBack, isSubmitting }: CeremonyStepFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>()

  const copy = CREATE_INVITE_FORM_COPY[2]
  const whatsapp = watch('whatsapp')

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <p className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="font-serif text-[28px] font-normal text-foreground">{copy.title}</h2>
        <p className="body-sm text-muted-foreground">{copy.description}</p>
      </div>

      <FormFieldGroup
        id="venueAddress"
        label={CEREMONY_STEP_FIELDS.venueAddress.label}
        helper={CEREMONY_STEP_FIELDS.venueAddress.helper}
        error={errors.venueAddress?.message}
      >
        <Input
          id="venueAddress"
          placeholder={CEREMONY_STEP_FIELDS.venueAddress.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.venueAddress)}
          {...register('venueAddress')}
        />
      </FormFieldGroup>

      <FormFieldGroup
        id="whatsapp"
        label={CEREMONY_STEP_FIELDS.whatsapp.label}
        helper={CEREMONY_STEP_FIELDS.whatsapp.helper}
        error={errors.whatsapp?.message}
      >
        <Input
          id="whatsapp"
          inputMode="tel"
          placeholder={CEREMONY_STEP_FIELDS.whatsapp.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.whatsapp)}
          value={whatsapp}
          {...register('whatsapp')}
          onChange={(event) => {
            setValue('whatsapp', maskWhatsApp(event.target.value), { shouldDirty: true })
          }}
        />
      </FormFieldGroup>

      <FormFieldGroup
        id="musicUrl"
        label={CEREMONY_STEP_FIELDS.musicUrl.label}
        helper={CEREMONY_STEP_FIELDS.musicUrl.helper}
        error={errors.musicUrl?.message}
      >
        <Input
          id="musicUrl"
          type="url"
          placeholder={CEREMONY_STEP_FIELDS.musicUrl.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.musicUrl)}
          {...register('musicUrl')}
        />
      </FormFieldGroup>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" className="justify-start" onClick={onBack}>
          ← {CREATE_INVITE_ACTIONS.back}
        </Button>
        <Button
          type="button"
          className="w-full rounded-3xl sm:w-auto sm:min-w-[270px]"
          disabled={isSubmitting}
          onClick={onContinue}
        >
          {CREATE_INVITE_ACTIONS.continueToPayment} <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  )
}
