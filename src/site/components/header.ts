import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import reset from '@unocss/reset/tailwind.css?inline'

@customElement('site-header')
export class Header extends LitElement {
  render() {
    return html`
      <header
        class="p-4 rounded">
        <nav
          class="container flex flex-wrap items-center justify-between h-8 mx-auto">
          <h2 class="self-center text-xl font-semibold whitespace-nowrap">
            Seia
          </h2>
          <div>
            <a href="https://github.com/importantimport/seia">
              <span class="i-simple-icons-github inline-block"></span>
            </a>
          </div>
        </nav>
      </header>
    `
  }

  // prettier-ignore
  static styles = unsafeCSS(`${reset}@unocss-placeholder`)
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': Header
  }
}
