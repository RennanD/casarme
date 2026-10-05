# Fronteiras & enforcement

## Direção de dependência

`shared → features → app`. Camadas mais baixas nunca importam das mais altas.

- `shared/` — agnóstico de projeto; usável em qualquer lugar.
- `features/` — importam de `shared/`, **nunca** de outra feature.
- `app/` — compõe features + shared (é onde os slices se encontram).

Comunicação entre features acontece **pra cima** (no `app/`) ou via domain/eventos compartilhados — nunca por import direto dos internals de outra feature.

## Public API do slice (`index.ts`)

Cada slice expõe um `index.ts` que é o **contrato** do slice. Fora do slice, importe só do `index.ts`, nunca de caminhos internos (`features/x/model/...`).

- Use re-exports **nomeados**: `export { Checkout } from './components/Checkout'`.
- **Nunca** `export * from ...` — obscurece o contrato, vaza internals e prejudica tree-shaking.

## ESLint — tornar a regra executável

Sem enforcement, a arquitetura é só aspiração. Use `import/no-restricted-paths` (eslint-plugin-import):

```js
// eslint.config.js (flat) — ajuste os paths ao repo
{
  rules: {
    'import/no-restricted-paths': ['error', {
      zones: [
        // features não importam entre si (uma zona por feature)
        { target: './src/features/checkout', from: './src/features', except: ['./checkout'] },
        { target: './src/features/search',   from: './src/features', except: ['./search'] },
        // camadas baixas não importam das altas
        { target: './src/shared',   from: ['./src/features', './src/app'] },
        { target: './src/features', from: './src/app' },
      ],
    }],
  },
}
```

## Fluxo de aplicação

Este lint **é o nosso padrão** — instale-o como parte de adotar a convenção, não como sugestão opcional. Confirme antes de editar a config do repo (é uma mutação), mas o alvo é sempre trazer o projeto pra esta regra, nunca acomodar exceções existentes.
