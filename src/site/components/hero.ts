import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import reset from '@unocss/reset/tailwind.css?inline'

import '../../seia'

@customElement('site-hero')
export class Hero extends LitElement {
  render() {
    return html`
      <section class="min-h-[calc(100vh-120px)] px-4">
        <div
          class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            <a
              href="https://github.com/importantimport/seia#readme"
              class="text-seia-primary hover:underline"
              >Simple and easy to use</a
            >
            <br />
            Webmentions component.
          </h1>
          <code class="opacity-75">
            <span
              >&lt;script type=&quot;module&quot;
              src=&quot;https://esm.run/seia&quot;
              async&gt;&lt;/script&gt;</span
            >
            <br />
            <span>&lt;s-e-i-a&gt;&lt;/s-e-i-a&gt;</span>
          </code>
        </div>
        <div class="max-w-prose mx-auto">
          <label
            for="seia_target"
            class="block mb-2 text-sm font-medium text-seia-text"
            >Try it here:</label
          >
          <input
            .value=${this.target}
            @input=${this.handleInput}
            id="seia_target"
            type="text"
            bg="seia-bg"
            text="seia-text"
            border="~ slate-300 dark:slate-600"
            class="mb-4 text-sm rounded-lg block w-full p-2.5" />
          <s-e-i-a .target=${this.target} .powered-by=${false}></s-e-i-a>
        </div>
      </section>
    `
  }

  @property({ type: String })
  target = 'https://kwaa.dev/2023'

  /** debounce timer */
  @property({ type: Number })
  timer: number | undefined = undefined

  private handleInput({ target: { value } }: { target: HTMLInputElement }) {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => (this.target = value), 1000)
  }

  // prettier-ignore
  static styles = unsafeCSS(`${reset}@unocss-placeholder`)
}

declare global {
  interface HTMLElementTagNameMap {
    'site-hero': Hero
  }
}
