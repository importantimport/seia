import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import reset from '@unocss/reset/tailwind.css?inline'

@customElement('site-footer')
export class Footer extends LitElement {
  render() {
    return html`
      <footer bg="slate-100 dark:slate-800" class="p-4 bg-white bottom-0">
        <div class="mx-auto max-w-screen-xl text-center">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
            ><a
              href="https://github.com/importantimport"
              class="hover:underline"
              >!mportantImport</a
            ></span
          >
        </div>
      </footer>
    `
  }

  // prettier-ignore
  static styles = unsafeCSS(`${reset}@unocss-placeholder`)
}

declare global {
  interface HTMLElementTagNameMap {
    'site-footer': Footer
  }
}
