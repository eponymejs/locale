# @eponyme/locale

Dashboard interface translations for [Eponyme](https://github.com/karibsen-studio/eponyme).

Eponyme ships English only. This package carries the other languages, so a catalogue can be
corrected and released without waiting for a version of the core.

## Install

```bash
npm i -D @eponyme/locale
```

## Use

Import the language you want and call it. The result goes into `nuxt.config`:

```ts
import { fr } from '@eponyme/locale/fr'

export default defineNuxtConfig({
  eponyme: {
    locale: fr(),
  },
})
```

One import per language, never an index: a single entry point would load every catalogue the
moment `nuxt.config` is evaluated.

The call matters. `locale: fr` passes the function itself and Eponyme refuses it at setup with a
message saying so.

## Available languages

| Import | Language | `code` |
|---|---|---|
| `@eponyme/locale/de` | German | `de-DE` |
| `@eponyme/locale/es` | Spanish | `es-ES` |
| `@eponyme/locale/fr` | French | `fr-FR` |
| `@eponyme/locale/it` | Italian | `it-IT` |
| `@eponyme/locale/nl` | Dutch | `nl-NL` |
| `@eponyme/locale/pt` | Portuguese | `pt-PT` |

`code` is handed to `Intl`, so dates, numbers and lists in the dashboard follow the same language
as the words around them.

## Overrides

The argument replaces individual messages without forking the catalogue:

```ts
locale: fr({
  'array.add': 'Ajouter un bloc',
  'collection.create': '+ Nouvel article',
}),
```

The merge happens in the call, so what Eponyme receives is already resolved.

## What happens to a missing key

Eponyme merges English underneath every catalogue. A key this package does not carry reads in
English rather than showing its own name, and the build says which ones:

```
[eponyme] WARN  The fr-FR catalogue is missing 2 keys, which fall back to English:
  - select.empty
  - field.color
```

That warning is the point of keeping translations in their own release cycle: the core adds a key,
this package does not know yet, and nothing breaks in the meantime.

## Adding a language

1. Copy `src/en.json` — the reference catalogue, which Eponyme exposes at
   `@karibsen/eponyme/locales/en.json` — to `src/<code>.json`.
2. Translate the values. Never touch the keys.
3. Add `src/<code>.ts` with the factory, and its `plural` rule if the language needs one.
4. Add the entry to `build.config.ts` and the subpath to `exports` in `package.json`.
5. Run `npm run check`, which fails when a catalogue has drifted from the reference.

### Plural forms

A message with plural forms separates them with `|`, in this order: none, one, many.

```json
{
  "array.counterMax": "{count} / {max} elementos | {count} / {max} elemento | {count} / {max} elementos"
}
```

`plural` maps a count to one of those three indices. The default is
`count => count === 0 ? 0 : count === 1 ? 1 : 2`, which is what French and Spanish use — what
differs between them is the wording of the zero form (`0 élément`, `0 elementos`), and that lives
in the catalogue, not in the rule.

A language that groups counts differently declares its own:

```ts
export function ru(overrides: Record<string, string> = {}): EponymeLocaleDefinition {
  return {
    code: 'ru-RU',
    messages: { ...messages, ...overrides },
    plural: count => (count % 10 === 1 && count % 100 !== 11 ? 0 : 1),
  }
}
```

`plural` is serialised into the generated catalogue with `Function.prototype.toString()`, so **it
must stand alone**: a closure over anything outside the function does not survive the crossing.

### Placeholders

`{name}` is replaced from the parameters Eponyme passes. Keep every placeholder a message has —
one that is dropped shows as literal `{count}` in the interface.

## Licence

MIT
