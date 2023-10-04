import { LitElement } from 'lit';
import '../../seia.ts';
export declare class Hero extends LitElement {
    render(): import("lit").TemplateResult<1>;
    target: string;
    /** debounce timer */
    timer: number | undefined;
    private handleInput;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'site-hero': Hero;
    }
}
