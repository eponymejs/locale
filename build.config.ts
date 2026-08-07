import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/es', 'src/fr'],
  declaration: true,
  clean: true,
  externals: ['@karibsen/eponyme'],
  rollup: { emitCJS: false },
})
