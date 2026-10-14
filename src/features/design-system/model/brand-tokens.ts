export const BRAND_TOKEN_SWATCHES = [
  {
    name: 'background',
    label: 'Fundo',
    value: '#FFFDFA',
    className: 'bg-background',
    outlined: true,
  },
  {
    name: 'secondary',
    label: 'Superfície',
    value: '#F8F6F2',
    className: 'bg-secondary',
    outlined: false,
  },
  {
    name: 'card',
    label: 'Cartão',
    value: '#FFFFFF',
    className: 'bg-card',
    outlined: true,
  },
  {
    name: 'primary',
    label: 'Dourado',
    value: '#D4A373',
    className: 'bg-primary',
    outlined: false,
  },
  {
    name: 'foreground',
    label: 'Texto',
    value: '#3E3E3E',
    className: 'bg-foreground',
    outlined: false,
  },
  {
    name: 'border',
    label: 'Borda',
    value: '#EEEAE4',
    className: 'bg-border',
    outlined: false,
  },
  {
    name: 'surface-sage',
    label: 'Superfície sage',
    value: '#EEF2EA',
    className: 'bg-surface-sage',
    outlined: false,
  },
  {
    name: 'surface-peach',
    label: 'Superfície pêssego',
    value: '#F3E8DF',
    className: 'bg-surface-peach',
    outlined: false,
  },
  {
    name: 'surface-lilac',
    label: 'Superfície lilás',
    value: '#EFEAF2',
    className: 'bg-surface-lilac',
    outlined: false,
  },
] as const

export const SHOWCASE_SECTION_ORDER = [
  'brand-tokens',
  'typography',
  'buttons',
  'forms',
] as const
