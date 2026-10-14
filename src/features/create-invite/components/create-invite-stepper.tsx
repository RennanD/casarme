import { cn } from '@/src/shared/lib/cn'

import type { WizardConfig, WizardStep } from '@/src/features/create-invite/model/wizard-config'

type CreateInviteStepperProps = {
  config: WizardConfig
  currentStep: WizardStep
}

export function CreateInviteStepper({ config, currentStep }: CreateInviteStepperProps) {
  return (
    <nav
      aria-label="Progresso do wizard"
      className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0"
    >
      <ol className="flex min-w-max items-center gap-6">
        {config.steps.map((step) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep

          return (
            <li
              key={step.number}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'text-sm leading-6 whitespace-nowrap',
                isCurrent ? 'font-semibold text-primary' : 'text-muted-foreground',
              )}
            >
              {isCompleted ? (
                <span>
                  <span aria-hidden>✓</span>
                  {'  '}
                  {String(step.number).padStart(2, '0')} {step.label}
                </span>
              ) : (
                <span>
                  {String(step.number).padStart(2, '0')} {step.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
