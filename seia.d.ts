import { LitElement } from 'lit';
/**
 * Seia Component.
 */
export declare class Seia extends LitElement {
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
    api: string;
    css: string;
    'powered-by': boolean;
    'unsafe-html': boolean;
    /** @see {@link https://github.com/aaronpk/webmention.io#sorting} */
    'sort-by': 'created' | 'updated' | 'published' | 'rsvp';
    /** @see {@link https://github.com/aaronpk/webmention.io#sorting} */
    'sort-dir': 'down' | 'up';
    /** @see {@link https://github.com/aaronpk/webmention.io#paging} */
    'per-page': number;
    /**
     * @defaultValue globalThis.location.href (without searchParams)
     */
    target: string;
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
    'fallback-photo': string;
    private mentions;
}
declare global {
    interface HTMLElementTagNameMap {
        's-e-i-a': Seia;
    }
}
