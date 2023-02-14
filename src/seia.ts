import type { Mentions } from './utils/types'
import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { Task } from '@lit-labs/task'
// tailwind preflights
import reset from '@unocss/reset/tailwind.css?inline'
// reduce links
import { reduce } from './utils/reduce'
// activity type emoji
import { emoji } from './utils/emoji'

/**
 * Seia Component.
 */
@customElement('s-e-i-a')
export class Seia extends LitElement {
  render() {
    return html`
      <style>
        ${this.css}
      </style>
      ${this.mentions.render({
        initial: () =>
          html`<div class="i-svg-spinners-90-ring-with-bg un-h-12 un-w-12" />`,
        pending: () => html`<div
          class="i-svg-spinners-270-ring-with-bg un-h-12 un-w-12" />`,
        error: console.error,
        complete: ({ links }: Mentions) => {
          const { avatar, content } = reduce(links)
          return html`
            ${avatar.length > 0
              ? html`
                  <div
                    class="un-flex un-flex-row-reverse un-justify-end un-flex-wrap un-gap-y-2 un-p-4 un-bg-gray-200 un-rounded-card un-mb-2">
                    ${avatar.map(
                      ({ activity, data: { author, url } }) => html`
                        <div
                          class="${activity.type === 'like'
                            ? 'p-like '
                            : ''}h-cite un-inline-block -un-space-x-2 un-space-x-reverse un-shrink-0">
                          <a class="u-url" href=${url}>
                            <figure class="un-relative p-author h-card">
                              <img
                                class="u-photo un-w-12 un-h-12 un-mb-auto un-rounded-avatar un-ring-2 un-ring-gray-200"
                                src=${author.photo ??
                                this['fallback-photo'].replace(
                                  '%NAME%',
                                  encodeURIComponent(author.name)
                                )} />
                              <span class="un-absolute un-bottom-0 un-right-0"
                                >${emoji[activity.type]}</span
                              >
                            </figure>
                          </a>
                          ${author.url &&
                          html`
                            <a class="p-name u-url un-hidden" href=${author.url}
                              >${author.name}</a
                            >
                          `}
                        </div>
                      `
                    )}
                  </div>
                `
              : null}
            ${content.length > 0
              ? html`
                  <div class="un-flex un-flex-col un-gap-2 un-mb-2">
                    ${content.map(
                      ({
                        activity,
                        data: { author, content, url },
                        verified_date
                      }) => html`
                        <div
                          class="p-comment h-cite un-p-4 un-bg-gray-200 un-rounded-card">
                          <div
                            class="p-author h-card un-flex un-items-center un-gap-3 un-mb-4">
                            <figure class="un-relative">
                              <img
                                class="u-photo un-w-12 un-h-12 un-mb-auto un-rounded-avatar"
                                src=${author.photo ??
                                this['fallback-photo'].replace(
                                  '%NAME%',
                                  encodeURIComponent(author.name)
                                )} />
                              <span class="un-absolute un-bottom-0 un-right-0"
                                >${emoji[activity.type]}</span
                              >
                            </figure>
                            <div class="un-flex un-flex-col un-break-all">
                              ${author.url
                                ? html`<a
                                    class="p-name u-url un-font-bold"
                                    href=${author.url}
                                    >${author.name}</a
                                  >`
                                : html`<span class="p-name un-font-bold"
                                    >${author.name}</span
                                  >`}
                              <span class="un-text-gray-600">
                                ${author.url &&
                                html`<a
                                  href=${author.url}
                                  class="u-url hover:un-underline"
                                  >${author.url.split('://')[1]}</a
                                >`}
                                <a class="u-url hover:un-underline" href=${url}>
                                  <time
                                    class="dt-published"
                                    datetime=${verified_date}
                                    >${new Date(
                                      verified_date
                                    ).toLocaleDateString()}</time
                                  >
                                </a>
                              </span>
                            </div>
                          </div>
                          <!-- TODO: p-r-o-s-e (unocss/unocss#2189) -->
                          <div class="e-content">
                            ${html`${this['unsafe-html']
                              ? unsafeHTML(content)
                              : content}`}
                          </div>
                        </div>
                      `
                    )}
                  </div>
                `
              : null}
          `
        }
      })}
    `
  }

  // prettier-ignore
  static styles = unsafeCSS(`${reset}@unocss-placeholder`)

  @property({ type: String })
  api = 'https://webmention.io/api/mentions.json'

  @property({ type: String })
  css = undefined

  @property({ type: Boolean })
  'unsafe-html' = true

  /** @see {@link https://github.com/aaronpk/webmention.io#sorting} */
  @property({ type: String })
  'sort-by': 'created' | 'updated' | 'published' | 'rsvp' = 'created'

  /** @see {@link https://github.com/aaronpk/webmention.io#sorting} */
  @property({ type: String })
  'sort-dir': 'down' | 'up' = 'down'

  /** @see {@link https://github.com/aaronpk/webmention.io#paging} */
  @property({ type: Number })
  'per-page' = 99

  /**
   * @defaultValue globalThis.location.href (without searchParams)
   */
  @property({ type: String })
  target = (() => {
    try {
      const url = new URL(globalThis.location.href)
      url.search = ''
      return url.toString()
    } catch {
      throw new Error('invalid URL')
    }
  })()

  /**
   * Fallback avatar.
   *
   * @remarks
   * When `data.author.photo` is null, this URL is used as the src.
   *
   * %NAME% will be automatically replaced with `data.author.name`:
   *
   * @example
   * ```ts
   * this['fallback-photo']
   *   .replace('%NAME%', encodeURIComponent(mention.data.author.name))
   * ```
   */
  @property({ type: String })
  'fallback-photo' =
    'https://ui-avatars.com/api/?name=%NAME%&background=random&format=svg'

  private mentions = new Task(this, {
    args: () => [],
    task: async () =>
      await fetch(
        `${this.api}?${new URLSearchParams({
          target: this.target,
          page: '0',
          'per-page': this['per-page'].toString(),
          'sort-by': this['sort-by'],
          'sort-dir': this['sort-dir']
        }).toString()}`
      )
        .then((res) => res.json())
        .catch(console.error)
  })
}

declare global {
  interface HTMLElementTagNameMap {
    's-e-i-a': Seia
  }
}
