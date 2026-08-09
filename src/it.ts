import type { EponymeLocaleDefinition } from '@karibsen/eponyme'
import messages from './it.json'

/**
 * The dashboard interface in Italian.
 */
export function it(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'it-IT',
    messages: { ...messages, ...overrides },
  }
}
