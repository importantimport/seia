import { LitElement } from 'lit';
import './components/header.ts';
import './components/hero.ts';
import './components/footer.ts';
export declare class App extends LitElement {
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'site-app': App;
    }
}
