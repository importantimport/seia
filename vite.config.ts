import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import {
  presetUno,
  presetIcons,
  transformerCompileClass,
  transformerVariantGroup,
  presetTypography
} from 'unocss'
import template from 'rollup-plugin-html-literals'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/seia.ts',
      formats: ['es']
    }
  },
  esbuild: { legalComments: 'external' },
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      presets: [
        presetUno({ prefix: 'un-' }),
        presetIcons({ prefix: 'i-', scale: 1.5 }),
        presetTypography()
      ],
      transformers: [
        transformerCompileClass({ classPrefix: 'seia-' }),
        transformerVariantGroup()
      ],
      theme: {
        colors: {
          bg: 'var(--seia-color-bg)',
          text: 'var(--seia-color-text',
          primary: 'var(--seia-color-primary)'
        },
        borderRadius: {
          avatar: 'var(--seia-rounded-avatar, 8964px)',
          card: 'var(--seia-rounded-card, 0.75rem)'
        }
      }
    }),
    template()
  ]
})
