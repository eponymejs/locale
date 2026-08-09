import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/de', 'src/es', 'src/fr', 'src/it', 'src/nl', 'src/pt'],
  declaration: true,
  clean: true,
  externals: ['@karibsen/eponyme'],
  rollup: { emitCJS: false },
})
