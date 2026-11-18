import { ROMANTIC_THEME } from '../../model/themes/romantic-theme'

export function FloralDivider() {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 200 40" className="h-8 w-48">
        <path
          d="M20,20 Q40,10 60,20 T100,20 T140,20 T180,20"
          stroke={ROMANTIC_THEME.accent}
          strokeWidth="1"
          fill="none"
        />
        <circle cx="100" cy="20" r="8" fill={ROMANTIC_THEME.accentLight} />
        <circle cx="100" cy="20" r="4" fill={ROMANTIC_THEME.accent} />
      </svg>
    </div>
  )
}
