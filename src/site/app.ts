import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
// tailwind preflights
import reset from '@unocss/reset/tailwind.css?inline'

import './components/header'
import './components/hero'
import './components/footer'

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
  static styles = unsafeCSS(`
    ${reset}
    @media (prefers-color-scheme: dark) {
      :root, :host {
        --seia-color-bg: #1e293b; /* slate-800 */
        --seia-color-text: #f1f5f9; /* slate-100 */
        --seia-color-primary: #fb923c; /* orange-400 */
      }
    };
    @unocss-placeholder
  `)
}

declare global {
  interface HTMLElementTagNameMap {
    'site-app': App
  }
}
