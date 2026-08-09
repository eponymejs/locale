import type { EponymeLocaleDefinition } from '@karibsen/eponyme'
import messages from './nl.json'

/**
 * The dashboard interface in Dutch.
 */
export function nl(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'nl-NL',
    messages: { ...messages, ...overrides },
  }
}
