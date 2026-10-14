'use client'

import { useFormContext } from 'react-hook-form'

import {
  COUPLE_STEP_FIELDS,
  getContinueActionLabel,
  getFormCopy,
} from '@/src/features/create-invite/model/copy'
import { maskWeddingDate, maskWeddingTime } from '@/src/features/create-invite/model/masks'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import type { WizardConfig } from '@/src/features/create-invite/model/wizard-config'
import { Button, Input } from '@/src/shared/ui'

import { FormFieldGroup } from './form-field-group'

const borderlessInputClass =
  'h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0'

type CoupleStepFormProps = {
  config: WizardConfig
  onContinue: () => void
  isSubmitting: boolean
}

export function CoupleStepForm({ config, onContinue, isSubmitting }: CoupleStepFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>()

  const copy = getFormCopy('couple', 1, config.stepCount)
  const weddingDate = watch('weddingDate')
  const weddingTime = watch('weddingTime')

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-normal text-foreground">{copy.title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{copy.description}</p>
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

      <div className="grid gap-4 sm:grid-cols-2">
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

        <FormFieldGroup
          id="weddingTime"
          label={COUPLE_STEP_FIELDS.weddingTime.label}
          error={errors.weddingTime?.message}
        >
          <Input
            id="weddingTime"
            inputMode="numeric"
            placeholder={COUPLE_STEP_FIELDS.weddingTime.placeholder}
            className={borderlessInputClass}
            aria-invalid={Boolean(errors.weddingTime)}
            value={weddingTime}
            {...register('weddingTime')}
            onChange={(event) => {
              setValue('weddingTime', maskWeddingTime(event.target.value), {
                shouldDirty: true,
              })
            }}
          />
        </FormFieldGroup>
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full rounded-3xl motion-safe:enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100"
        disabled={isSubmitting}
        onClick={onContinue}
      >
        {getContinueActionLabel('couple')} <span aria-hidden>→</span>
      </Button>
    </div>
  )
}
