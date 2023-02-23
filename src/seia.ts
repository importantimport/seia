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
      <div id="seia-container" flex="~ col" gap="2" text="seia-text">
        ${this.mentions.render({
          initial: () =>
            html`<i-svg-spinners-90-ring-with-bg
              w-12
              h-12
              mx-auto
              my-4
              text="seia-primary" />`,
          pending: () =>
            html`<i-svg-spinners-270-ring-with-bg
              w-12
              h-12
              mx-auto
              my-4
              text="seia-primary" />`,
          error: console.error,
          complete: ({ links }: Mentions) => {
            const { avatar, content } = reduce(links)
            return html`
              ${avatar.length > 0
                ? html`
                    <div
                      id="seia-avatar-container"
                      flex="~ row-reverse wrap"
                      space-x="-2 reverse"
                      gap="y-2"
                      p-4
                      bg="seia-bg"
                      justify="end"
                      rounded="card">
                      ${avatar.map(
                        ({ activity, data: { author, url } }) => html`
                          <div
                            shrink="0"
                            class="${activity.type === 'like'
                              ? 'p-like '
                              : ''}h-cite">
                            <a class="u-url" href=${url}>
                              <figure relative class="p-author h-card">
                                <img
                                  w-12
                                  h-12
                                  mb-auto
                                  bg="seia-bg"
                                  rounded="avatar"
                                  ring="2 seia-bg"
                                  class="u-photo"
                                  src=${author.photo ??
                                  this['fallback-photo'].replace(
                                    '%NAME%',
                                    encodeURIComponent(author.name)
                                  )} />
                                <span absolute bottom="0" right="0"
                                  >${emoji[activity.type]}</span
                                >
                              </figure>
                            </a>
                            ${author.url &&
                            html`
                              <a class="p-name u-url" hidden href=${author.url}
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
                    <div id="seia-content-container" flex="~ col" gap="2">
                      ${content.map(
                        ({
                          activity,
                          data: { author, content, url },
                          verified_date
                        }) => html`
                          <div
                            p-4
                            bg="seia-bg"
                            rounded="card"
                            class="p-comment h-cite">
                            <div
                              flex
                              items-center
                              gap="3"
                              mb-4
                              class="p-author h-card">
                              <figure relative>
                                <img
                                  w-12
                                  h-12
                                  mb-auto
                                  rounded="avatar"
                                  class="u-photo"
                                  src=${author.photo ??
                                  this['fallback-photo'].replace(
                                    '%NAME%',
                                    encodeURIComponent(author.name)
                                  )} />
                                <span absolute bottom="0" right="0"
                                  >${emoji[activity.type]}</span
                                >
                              </figure>
                              <div flex="~ col" break-all>
                                ${author.url
                                  ? html`<a
                                      font="bold"
                                      class="p-name u-url"
                                      href=${author.url}
                                      >${author.name}</a
                                    >`
                                  : html`<span font="bold" class="p-name"
                                      >${author.name}</span
                                    >`}
                                <span opacity-75>
                                  ${author.url &&
                                  html`<a
                                      href=${author.url}
                                      hover="underline"
                                      class="u-url"
                                      >${author.url.split('://')[1]}</a
                                    >
                                    <span>·</span>`}
                                  <a
                                    href=${url}
                                    hover="underline"
                                    class="u-url">
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
              ${this['powered-by']
                ? html`<span ml-auto mr-2 text="sm"
                    >Powered by
                    ${this.api.includes('webmention.io')
                      ? html`<a
                            href="https://webmention.io"
                            rel="noopener noreferrer"
                            target="_blank"
                            text="seia-primary"
                            hover="underline"
                            >Webmention.io</a
                          >
                          &`
                      : ''}
                    <a
                      href="https://github.com/importantimport/seia"
                      rel="noopener noreferrer"
                      target="_blank"
                      text="seia-primary"
                      hover="underline"
                      >Seia</a
                    ></span
                  >`
                : ''}
            `
          }
        })}
      </div>
    `
  }

  // prettier-ignore
  static styles = unsafeCSS(`${reset}@unocss-placeholder`)

  @property({ type: String })
  api = 'https://webmention.io/api/mentions.json'

  @property({ type: String })
  css = undefined

  @property({ type: Boolean })
  'powered-by' = true

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
    args: () => [this.target],
    task: async ([target]) =>
      await fetch(
        `${this.api}?${new URLSearchParams({
          target,
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
