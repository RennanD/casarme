import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const V1_PATHS = ['./src/components', './src/lib', './src/hooks']

const FEATURE_INTERNAL_LAYERS = [
  'components',
  'hooks',
  'model',
  'api',
  'stores',
  'types',
]

function listFeatureNames() {
  const featuresDir = path.join(rootDir, 'src/features')

  if (!fs.existsSync(featuresDir)) {
    return []
  }

  return fs
    .readdirSync(featuresDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

/** Features must not cross-import each other. */
export function featureCrossImportZones() {
  return listFeatureNames().map((name) => ({
    target: `./src/features/${name}`,
    from: './src/features',
    except: [`./${name}`],
  }))
}

/** Features must not import from app. */
export function featureAppImportZones() {
  return listFeatureNames().map((name) => ({
    target: `./src/features/${name}`,
    from: './src/app',
  }))
}

/** App must import features via public API (index), not internal layers. */
export function appFeaturePublicApiZones() {
  return listFeatureNames().flatMap((name) =>
    FEATURE_INTERNAL_LAYERS.map((layer) => ({
      target: './src/app',
      from: `./src/features/${name}/${layer}`,
    })),
  )
}

/** Core layer boundaries: shared → features → app. */
export function coreLayerZones() {
  return [
    {
      target: './src/shared',
      from: ['./src/features', './src/app', ...V1_PATHS],
    },
    {
      target: './src/features',
      from: './src/app',
    },
  ]
}

/** v2 routes must stay isolated from v1 code. */
export function v2IsolationZones() {
  return [
    {
      target: './src/app/v2',
      from: V1_PATHS,
    },
  ]
}

/** App must import shared UI via the barrel file. */
export function appSharedUiPublicApiZones() {
  return [
    {
      target: './src/app',
      from: './src/shared/ui',
      except: ['./index.ts', './index'],
    },
  ]
}

export function boundaryZones() {
  return [
    ...coreLayerZones(),
    ...v2IsolationZones(),
    ...featureCrossImportZones(),
    ...featureAppImportZones(),
    ...appFeaturePublicApiZones(),
    ...appSharedUiPublicApiZones(),
  ]
}
