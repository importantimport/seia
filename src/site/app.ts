import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
// tailwind preflights
import reset from '@unocss/reset/tailwind.css?inline'

import './components/header.ts'
import './components/hero.ts'
import './components/footer.ts'

@customElement('site-app')
export class App extends LitElement {
  render() {
    return html`
      <main bg="white dark:slate-900" text="slate-900 dark:slate-100">
        <site-header></site-header>
        <site-hero></site-hero>
        <site-footer></site-footer>
      </main>
    `
  }

  // prettier-ignore
  static styles = unsafeCSS(`${reset}@unocss-placeholder`)
}

declare global {
  interface HTMLElementTagNameMap {
    'site-app': App
  }
}
