# Seia

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/importantimport/seia?file=index.html)
[![npm package](https://img.shields.io/npm/v/seia)](https://www.npmjs.com/package/seia)
![brotli size](https://img.badgesize.io/https://esm.run/seia?compression=brotli)

Browser-side Web Component for rendering Webmentions.

## Usage

### Component

Import scripts from CDN or NPM:

###### CDN

```html
<script type="module" src="https://esm.run/seia"></script>
```

###### NPM

```bash
pnpm add seia # pnpm
# yarn add seia # yarn
# npm i seia # npm
```

```ts
import 'seia'
```

Now add Seia components where you need them:

```html
<s-e-i-a></s-e-i-a>
```

### Wrapper

Can't create React / Vue / Angular wrapper until [lit/lit#3334](https://github.com/lit/lit/issues/3334) is fixed.

## Customizing

### CSS Variables

> WIP

You can adjust the appearance of Seia with CSS variables.

For example, to apply the Material 3 color scheme:

```css
:root {
  --seia-color-bg: var(--md-sys-color-surface-variant);
  --seia-color-text: var(--md-sys-color-on-surface-variant);
  --seia-color-primary: var(--md-sys-color-primary);
}
```

### Style Element

You can inject styles into the Shadow DOM via the `css` attribute.

```html
<s-e-i-a css=".h-cite{padding:1rem};"></s-e-i-a>
```

### Emoji Fonts

> WIP

Seia uses text rather than icons, so importing Emoji fonts and setting the font-family should work. for example:

```css
/* Noto Colr Emoji Glyf */
@import url('https://fonts.googleapis.com/css2?family=Noto+Colr+Emoji+Glyf&display=swap');

:root {
  --seia-font-family: ui-sans-serif, sans-serif, 'Noto Colr Emoji Glyf';
  --seia-font-family-mono: ui-monospace, monospace, 'Noto Colr Emoji Glyf';
}
```
