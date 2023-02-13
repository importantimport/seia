import { defineConfig } from 'tsup'

export default defineConfig({
  dts: { resolve: true },
  entry: ['src/seia.ts'],
  format: []
})
