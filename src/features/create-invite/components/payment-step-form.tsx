'use client'

import { Check } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import {
  buildOrderSummaryLabel,
  calculateOrderTotal,
  PLANNER_ADDON_DISPLAY,
  type CreateInviteTemplate,
} from '@/src/features/create-invite/model/catalog'
import {
  CREATE_INVITE_ACTIONS,
  getFormCopy,
  ORDER_SUMMARY_COPY,
  PAYMENT_PRIVACY_NOTE,
  PAYMENT_STEP_FIELDS,
  PLANNER_ORDER_BUMP,
} from '@/src/features/create-invite/model/copy'
import { maskCpf } from '@/src/features/create-invite/model/masks'
import type { CreateInviteFormValues } from '@/src/features/create-invite/model/schemas'
import type { WizardConfig } from '@/src/features/create-invite/model/wizard-config'
import { cn } from '@/src/shared/lib/cn'
import { Button, Input } from '@/src/shared/ui'

import { FormFieldGroup } from './form-field-group'

const borderlessInputClass =
  'h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0'

type PaymentStepFormProps = {
  template: CreateInviteTemplate
  config: WizardConfig
  stepNumber: number
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string | null
}

export function PaymentStepForm({
  template,
  config,
  stepNumber,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}: PaymentStepFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>()

  const copy = getFormCopy('payment', stepNumber, config.stepCount)
  const cpf = watch('cpf')
  const includePlanner = watch('includePlanner')
  const orderTotal = calculateOrderTotal(template.displayPrice, includePlanner)
  const summaryLabel = buildOrderSummaryLabel(template.name, includePlanner)

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-normal text-foreground">{copy.title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{copy.description}</p>
      </div>

      <FormFieldGroup
        id="email"
        label={PAYMENT_STEP_FIELDS.email.label}
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={PAYMENT_STEP_FIELDS.email.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
      </FormFieldGroup>

      <FormFieldGroup
        id="cpf"
        label={PAYMENT_STEP_FIELDS.cpf.label}
        error={errors.cpf?.message}
      >
        <Input
          id="cpf"
          inputMode="numeric"
          placeholder={PAYMENT_STEP_FIELDS.cpf.placeholder}
          className={borderlessInputClass}
          aria-invalid={Boolean(errors.cpf)}
          value={cpf}
          {...register('cpf')}
          onChange={(event) => {
            setValue('cpf', maskCpf(event.target.value), { shouldDirty: true })
          }}
        />
      </FormFieldGroup>

      <label
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-xl border border-primary bg-card p-4',
          !includePlanner && 'border-border',
        )}
      >
        <span
          className={cn(
            'relative mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border',
            includePlanner ? 'border-primary bg-primary' : 'border-border bg-background',
          )}
        >
          <input type="checkbox" className="peer sr-only" {...register('includePlanner')} />
          <Check
            className={cn(
              'size-3.5 text-primary-foreground transition-opacity duration-150',
              includePlanner ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {PLANNER_ORDER_BUMP.label}
          </span>
          <span className="text-sm font-semibold text-foreground">{PLANNER_ORDER_BUMP.title}</span>
          <span className="text-xs text-muted-foreground">{PLANNER_ORDER_BUMP.description}</span>
        </span>
        <span className="font-serif text-lg text-foreground">{PLANNER_ADDON_DISPLAY}</span>
      </label>

      <p className="text-xs leading-relaxed text-muted-foreground">{PAYMENT_PRIVACY_NOTE}</p>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3.5">
        <div>
          <p className="text-sm font-semibold text-foreground">{ORDER_SUMMARY_COPY.totalLabel}</p>
          <p className="text-sm leading-snug text-foreground">{summaryLabel}</p>
        </div>
        <p className="font-serif text-xl text-foreground">{orderTotal.formattedTotal}</p>
      </div>

      {submitError ? (
        <p className="text-xs text-destructive" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" className="justify-start" onClick={onBack}>
          ← {CREATE_INVITE_ACTIONS.back}
        </Button>
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <Button
            type="button"
            size="lg"
            className="w-full rounded-3xl motion-safe:enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100 sm:min-w-72"
            disabled={isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? CREATE_INVITE_ACTIONS.submitting : CREATE_INVITE_ACTIONS.createInvite}{' '}
            <span aria-hidden>→</span>
          </Button>
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            {CREATE_INVITE_ACTIONS.pixUnavailable}
          </p>
        </div>
      </div>
    </div>
  )
}
