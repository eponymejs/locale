import type { EponymeLocaleDefinition } from '@karibsen/eponyme'
import messages from './fr.json'

/**
 * The dashboard interface in French.
 *
 * A function rather than a plain object so a project can override a wording without forking the
 * catalogue. The merge happens here, so what the module receives is already resolved.
 *
 * ```ts
 * import { fr } from '@eponyme/locale/fr'
 *
 * export default defineNuxtConfig({
 *   eponyme: { locale: fr({ 'array.add': 'Ajouter un bloc' }) },
 * })
 * ```
 *
 * No `plural`: French selects the same three forms as the default rule — nought and one take the
 * singular, everything above takes the plural. What differs from English is the wording of the
 * zero form, and that lives in `fr.json`, not in the rule.
 */
export function fr(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'fr-FR',
    messages: { ...messages, ...overrides },
  }
}
