import type { EponymeLocaleDefinition } from '@karibsen/eponyme'
import messages from './es.json'

/**
 * The dashboard interface in Spanish.
 *
 * A function rather than a plain object so a project can override a wording without forking the
 * catalogue. The merge happens here, so what the module receives is already resolved.
 *
 * ```ts
 * import { es } from '@eponyme/locale/es'
 *
 * export default defineNuxtConfig({
 *   eponyme: { locale: es({ 'array.add': 'Añadir un bloque' }) },
 * })
 * ```
 *
 * No `plural`: Spanish selects the same three forms as the default rule. It differs from English
 * in that nought takes the plural — `0 elementos`, not `0 elemento` — and that is a matter of
 * wording, which lives in `es.json`, not of which form is chosen.
 */
export function es(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'es-ES',
    messages: { ...messages, ...overrides },
  }
}
