'use client'

import { useFormContext } from 'react-hook-form'

import {
  COUPLE_STEP_FIELDS,
  CREATE_INVITE_ACTIONS,
  CREATE_INVITE_FORM_COPY,
} from '@/src/features/create-invite/model/copy'
import { maskWeddingDate } from '@/src/features/create-invite/model/masks'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import { Button, Input } from '@/src/shared/ui'

import { FormFieldGroup } from './form-field-group'

const borderlessInputClass =
  'h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0'

type CoupleStepFormProps = {
  onContinue: () => void
  isSubmitting: boolean
}

export function CoupleStepForm({ onContinue, isSubmitting }: CoupleStepFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>()

  const copy = CREATE_INVITE_FORM_COPY[1]
  const weddingDate = watch('weddingDate')

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1">
        <p className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="font-serif text-[28px] font-normal text-foreground">{copy.title}</h2>
        <p className="body-sm text-muted-foreground">{copy.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldGroup
          id="brideName"
          label={COUPLE_STEP_FIELDS.brideName.label}
          error={errors.brideName?.message}
        >
          <Input
            id="brideName"
            placeholder={COUPLE_STEP_FIELDS.brideName.placeholder}
            className={borderlessInputClass}
            aria-invalid={Boolean(errors.brideName)}
            {...register('brideName')}
          />
        </FormFieldGroup>

        <FormFieldGroup
          id="groomName"
          label={COUPLE_STEP_FIELDS.groomName.label}
          error={errors.groomName?.message}
        >
          <Input
            id="groomName"
            placeholder={COUPLE_STEP_FIELDS.groomName.placeholder}
            className={borderlessInputClass}
            aria-invalid={Boolean(errors.groomName)}
            {...register('groomName')}
          />
        </FormFieldGroup>
      </div>

      <FormFieldGroup
        id="weddingDate"
        label={COUPLE_STEP_FIELDS.weddingDate.label}
        error={errors.weddingDate?.message}
      >
        <Input
          id="weddingDate"
          inputMode="numeric"
          placeholder={COUPLE_STEP_FIELDS.weddingDate.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.weddingDate)}
          value={weddingDate}
          {...register('weddingDate')}
          onChange={(event) => {
            setValue('weddingDate', maskWeddingDate(event.target.value), {
              shouldDirty: true,
            })
          }}
        />
      </FormFieldGroup>

      <Button
        type="button"
        size="lg"
        className="w-full rounded-[26px]"
        disabled={isSubmitting}
        onClick={onContinue}
      >
        {CREATE_INVITE_ACTIONS.continueToCeremony} <span aria-hidden>→</span>
      </Button>
    </div>
  )
}
