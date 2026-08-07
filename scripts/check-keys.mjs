/**
 * Compares every catalogue against the English one shipped by the core.
 *
 * This is the price of keeping translations in their own repository: the core adds a key, this
 * one does not know. The module merges English underneath at build time so nothing breaks, but
 * a catalogue silently drifting into half-English is worth failing CI over.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const here = dirname(fileURLToPath(import.meta.url))
const source = join(here, '..', 'src')

/**
 * The installed package in CI; the sibling checkout when this repo is cloned into an eponyme
 * working copy at `packages/locales`, where the core is source rather than a dependency.
 */
function referencePath() {
  try {
    return require.resolve('@karibsen/eponyme/locales/en.json')
  }
  catch {
    return join(here, '..', '..', '..', 'src', 'runtime', 'locales', 'en.json')
  }
}

const reference = JSON.parse(readFileSync(referencePath(), 'utf8'))
const expected = Object.keys(reference).sort()

let failed = false
for (const file of readdirSync(source).filter(name => name.endsWith('.json'))) {
  const catalogue = JSON.parse(readFileSync(join(source, file), 'utf8'))
  const missing = expected.filter(key => !(key in catalogue))
  const extra = Object.keys(catalogue).filter(key => !(key in reference)).sort()

  if (missing.length) {
    failed = true
    console.error(`${file}: ${missing.length} missing key(s)\n${missing.map(key => `  - ${key}`).join('\n')}`)
  }
  if (extra.length) {
    failed = true
    console.error(`${file}: ${extra.length} key(s) the core does not define\n${extra.map(key => `  - ${key}`).join('\n')}`)
  }
  if (!missing.length && !extra.length) console.log(`${file}: ${expected.length} keys, complete.`)
}

process.exit(failed ? 1 : 0)
