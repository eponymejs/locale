import type { EponymeLocaleDefinition } from '@karibsen/eponyme'
import messages from './pt.json'

/**
 * The dashboard interface in Portuguese.
 */
export function pt(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'pt-PT',
    messages: { ...messages, ...overrides },
  }
}
