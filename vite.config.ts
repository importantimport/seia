import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import {
  presetAttributify,
  presetTagify,
  presetUno,
  presetIcons,
  presetTypography,
  transformerCompileClass,
  transformerVariantGroup
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
        presetAttributify(),
        presetTagify(),
        presetUno(),
        presetIcons({ prefix: 'i-', scale: 1.5 }),
        presetTypography()
      ],
      transformers: [
        transformerCompileClass({ classPrefix: 'seia-' }),
        transformerVariantGroup()
      ],
      theme: {
        colors: {
          seia: {
            bg: 'var(--seia-color-bg, #f9fafb)', // coolgray-50
            text: 'var(--seia-color-text, #111827)', // coolgray-900
            primary: 'var(--seia-color-primary, #f59e0b)' // orange-500
          }
        },
        borderRadius: {
          avatar: 'var(--seia-rounded-avatar, 8964px)', // rounded-full
          card: 'var(--seia-rounded-card, 0.75rem)' // rounded-xl
        }
      }
    }),
    template()
  ]
})
