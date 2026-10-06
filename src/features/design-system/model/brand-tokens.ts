export const BRAND_TOKEN_SWATCHES = [
  { name: 'primary', className: 'bg-primary' },
  { name: 'secondary', className: 'bg-secondary' },
  { name: 'background', className: 'bg-background' },
  { name: 'foreground', className: 'bg-foreground' },
  { name: 'muted-foreground', className: 'bg-muted-foreground' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'border', className: 'bg-border' },
  { name: 'card', className: 'bg-card' },
] as const

export const SHOWCASE_SECTION_ORDER = [
  'brand-tokens',
  'typography',
  'buttons',
  'badges',
  'cards',
  'links',
  'forms',
  'separator',
] as const
