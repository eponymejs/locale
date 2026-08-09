import type { EponymeLocaleDefinition } from '@karibsen/eponyme'
import messages from './de.json'

/**
 * The dashboard interface in German.
 */
export function de(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'de-DE',
    messages: { ...messages, ...overrides },
  }
}
