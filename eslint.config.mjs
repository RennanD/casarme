import { FlatCompat } from '@eslint/eslintrc'
import importPlugin from 'eslint-plugin-import'

import { boundaryZones } from './eslint/boundaries.mjs'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: boundaryZones(),
        },
      ],
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
]

export default eslintConfig
