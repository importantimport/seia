import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
// tailwind preflights
import reset from '@unocss/reset/tailwind.css?inline'
// seia dark theme
import dark from '../styles/dark.css?inline'

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
  static styles = unsafeCSS(`${reset}${dark}@unocss-placeholder`)
}

declare global {
  interface HTMLElementTagNameMap {
    'site-app': App
  }
}
