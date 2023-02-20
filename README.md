# Seia

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/importantimport/seia?file=index.html)
[![npm package](https://img.shields.io/npm/v/seia)](https://www.npmjs.com/package/seia)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/seia?color=%23ff5627)](https://www.jsdelivr.com/package/npm/seia)
![brotli size](https://img.badgesize.io/https://esm.run/seia?compression=brotli)

Browser-side Web Component for rendering Webmentions.

## Compatible Services

- [Webmention.io](https://webmention.io) (mentions.json)
- PR's welcome!

## Usage

### Component

Import scripts from CDN or NPM:

###### CDN

```html
<script type="module" src="https://esm.run/seia" async></script>
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

## Attributes

| Attribute      | Default                                                              | Comment                                                                   |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| api            | https://webmention.io/api/mentions.json                              |                                                                           |
| css            | undefined                                                            | Inject styles                                                             |
| powered-by     | true                                                                 |                                                                           |
| unsafe-html    | true                                                                 |                                                                           |
| sort-by        | 'created'                                                            | [webmention.io#sorting](https://github.com/aaronpk/webmention.io#sorting) |
| sort-dir       | 'down'                                                               | [webmention.io#sorting](https://github.com/aaronpk/webmention.io#sorting) |
| per-page       | 99                                                                   | [webmention.io#paging](https://github.com/aaronpk/webmention.io#paging)   |
| target         | globalThis.location.href                                             | without searchParams                                                      |
| fallback-photo | https://ui-avatars.com/api/?name=%NAME%&background=random&format=svg | `%NAME%` will be replaced with the `author.name`                          |

## Customizing

### CSS Variables

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

### Presets

Seia has prepared a number of presets.

#### Dark Mode

Add simple dark mode support for the default color scheme.

It is not enabled by default since custom color schemes are encouraged.

```html
<!-- link -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/seia/dist/styles/dark.css" />
<!-- inject -->
<s-e-i-a
  css="@import url('https://cdn.jsdelivr.net/npm/seia/dist/styles/dark.css');"></s-e-i-a>
```

#### Material Theme

Apply the Material Theme as shown above.

```html
<!-- link -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/seia/dist/styles/material.css" />
<!-- inject -->
<s-e-i-a css="@import url('https://cdn.jsdelivr.net/npm/seia/dist/styles/material.css');"></s-e-i-a>
```

### Emoji Fonts

Seia uses text rather than icons, so importing Emoji fonts and setting the font-family should work. for example:

```css
/* Noto Colr Emoji Glyf */
@import url('https://fonts.googleapis.com/css2?family=Noto+Colr+Emoji+Glyf&display=swap');
```
