import { type PluginOption, defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'
import { compileLitTemplates } from '@lit-labs/compiler'
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

export const plugins = [
  typescript({
    declaration: true,
    transformers: {
      before: [compileLitTemplates()]
    },
  }) as PluginOption,
  UnoCSS({
    mode: 'shadow-dom',
    presets: [
      presetAttributify(),
      presetTagify(),
      presetUno({ dark: 'media' }),
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
          bg: 'var(--seia-color-bg, #f8fafc)', // slate-50
          text: 'var(--seia-color-text, #0f172a)', // slate-900
          primary: 'var(--seia-color-primary, #ea580c)' // orange-600
        }
      },
      borderRadius: {
        avatar: 'var(--seia-rounded-avatar, 8964px)', // rounded-full
        card: 'var(--seia-rounded-card, 0.75rem)' // rounded-xl
      }
    }
  }),
  template(),
]

export default defineConfig({
  build: {
    lib: {
      entry: 'src/seia.ts',
      formats: ['es']
    }
  },
  esbuild: { legalComments: 'external' },
  plugins,
})
