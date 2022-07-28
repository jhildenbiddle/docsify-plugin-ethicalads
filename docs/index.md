# docsify-plugin-ethicalads

[![NPM](https://img.shields.io/npm/v/docsify-plugin-ethicalads.svg?style=flat-square)](https://www.npmjs.com/package/docsify-plugin-ethicalads)
[![GitHub Workflow Status (main)](https://img.shields.io/github/workflow/status/jhildenbiddle/docsify-plugin-ethicalads/Build/main?label=checks&style=flat-square)](https://github.com/jhildenbiddle/docsify-plugin-ethicalads/actions?query=branch%3Amain+)
[![Codacy grade](https://img.shields.io/codacy/grade/63c04a45757e46c78e4e01c99346548c.svg?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/docsify-plugin-ethicalads/dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/docsify-plugin-ethicalads/blob/main/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/docsify-plugin-ethicalads/badge)](https://www.jsdelivr.com/package/npm/docsify-plugin-ethicalads)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-ethicalads&hashtags=docsify,developers,frontend,plugin)
<a class="github-button" href="https://github.com/jhildenbiddle/docsify-plugin-ethicalads" data-icon="octicon-star" data-show-count="true" aria-label="Star jhildenbiddle/docsify-plugin-ethicalads on GitHub">Star</a>

A [docsify.js](https://docsify.js.org) plugin for rendering ad placements from [EthicalAds](https://www.ethicalads.io/).

## Demo

Sample ad placements using default and custom styles.

<div class="ad-grid">
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="image"
    data-ea-campaign-types="house">
  </div>
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="image"
    data-ea-campaign-types="house"
    class="dark horizontal"
    style="--ea-strong-color: #22d3ee;">
  </div>
</div>

<div class="ad-grid">
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="text"
    data-ea-campaign-types="house"
    style="flex: 1 1 300px;">
  </div>
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="text"
    data-ea-campaign-types="house"
    class="custom-ad"
    style="flex: 1 1 300px;">
  </div>
</div>

## Features

- Render ad placements from [EthicalAds](https://www.ethicalads.io/) within docsify sites
- Supports multiple ad placements and locations
- Configure placements using EthicalAds [API options](https://ethical-ad-client.readthedocs.io/)
- Customize placement styles using CSS custom properties
- Compatible with [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/) themes

?> Like this plugin? Be sure to check out [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable) for your site theme, [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/) for tabbed content, and [docsify-plugin-runkit](https://jhildenbiddle.github.io/docsify-plugin-runkit/) for live JavaScript REPLs!

## Installation

1. Apply to [become a publisher](https://www.ethicalads.io/publishers/) on the [EthicalAds](https://www.ethicalads.io/) network. You will need a valid publisher ID to render ad placements on your site.

1. Add the plugin to your `index.html` after docsify. The plugin is available on [jsdelivr](https://www.jsdelivr.com/package/npm/docsify-plugin-ethicalads) (below), [unpkg](https://unpkg.com/browse/docsify-plugin-ethicalads/), and other CDN services that auto-publish npm packages.

   ```html
   <!-- docsify (latest v4.x.x)-->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4"></script>

   <!-- docsify-plugin-ethicalads (latest v1.x.x) -->
   <script src="https://cdn.jsdelivr.net/npm/docsify-plugin-ethicalads@1"></script>
   ```

   The plugin is also available for installation from npm:

   ```bash
   npm install docsify-plugin-ethicalads
   ```

1. Add an `ethicalAds` property to the [`window.$docsify`](https://docsify.js.org/#/configuration) configuration object in your `index.html` file along with your publisher ID:

   ```html
   <script>
     window.$docsify = {
       // ...
       ethicalAds: {
         eaPublisher: 'my-publisher-id',
         // More options...
       }
     };
   </script>
   ```

1. Review the [Usage](#usage) and [Options](#options) sections for implementation and configuration details.

## Usage

### Preset placements

The plugin has two preset ad placements: one in the sidebar and one set using a fixed-footer element.

By default, the plugin will render the preset placement in the sidebar. To prevent his behavior, set the [`showSidebar`](#showsidebar) option to `false`:

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  showSidebar: false
}
```

Similarly, to render the preset fixed-footer placement, set [`showFooter`](#showfooter) to `true`:

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  showFooter: true
}
```

### Dynamic placements

The [`placements`](#placements) option allows defining multiple ad placements and configuration options via the `$docsify.ethicalAds` configuration object.

For example, here is a sample configuration for rendering two text-based ad placements:

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  placements: [
    {
      // Inserts placement after first <h2> element in `#main`
      insertAfter: '#main > h2',
      eaType: 'text'
    },
    {
      // Appends placement to `#main`
      appendTo: '#main',
      eaType: 'text'
    }
  ]
}
```

### Static placements

Static ad placements can be added to markdown content using HTML elements as described in the official [EthicalAds documentation](https://ethical-ad-client.readthedocs.io/):

```markdown
## My heading

Here is some markdown text.

<div data-ea-type="text" data-ea-keywords="foo|bar|baz"></div>
```

Note that if a `data-ea-publisher` attribute is omitted but a `data-ea-type` attribute is added, the plugin will automatically set the missing publisher attribute to the [`eaPublisher`](#data-attributes) option value.

## Options

Options are set using the `ethicalAds` property of the [`window.$docsify`](https://docsify.js.org/#/configuration) configuration object:

```js
window.$docsify = {
  // ...
  ethicalAds: {
    eaPublisher: 'my-publisher-id',
    eaCampaignTypes: 'paid|community',
    class: 'custom-ad'
  }
};
```

Options can also be set on static ad placements using `data-ea` [data attributes](#data-attributes) and standard [HTML attributes](#html-attributes). Note that while options set via JavaScript use “camelCase” names (e.g. `campaignTypes`), options set via data attributes use “kebab-case” (e.g. `campaign-types`).

```html
<div
  data-ea-publisher="my-publisher-id"
  data-ea-campaign-types="paid|community"
  class="custom-ad">
</div>
```

### Data attributes

- Type: `String`

The following options will set corresponding `data-ea-` data attributes and values on ad placements. These settings will also be used as the default values for all placement configurations found in the [`placements`](#placements) array.

- `eaPublisher`: EthicalAds publisher id for your account
- `eaType`: Ad placement type. Value can be either `image` (default) or `text`.
- `eaKeywords`: A pipe (`|`) separated array of keywords for this ad placement
- `eaCampaignTypes`: A pipe (`|`) separated array of campaign types
- `eaForcedAd`: Specifies an ad placement for testing
- `eaForceCampaign`: Specifies a campaign (group of ads) for testing
- `eaStyle`: Applies EthicalAds placement style. Value can be `fixedfooter` or `stickybox`.

?> For additional details on these options, see the official [EthicalAds documentation](https://ethical-ad-client.readthedocs.io/).

**Example**

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  eaType: 'text',
  eaCampaignTypes: 'paid|community',
  eaKeywords: 'foo|bar|baz'
}
```

**Output**

```html
<div
  data-ea-publisher="my-publisher-id"
  data-ea-type="text"
  data-ea-campaign-types="paid|community"
  data-ea-keywords="foo|bar|baz">
</div>
```

### HTML attributes

- Type: `String`

The following options will set corresponding HTML attributes and values on ad placements:

- `class`: CSS class containing custom placement styles
- `id`: A placement identifier. Recommended to prefix with `ea-` to avoid conflicts.
- `style`: Custom style declarations. May be used to set plugin-specific custom properties.

**Example**

```js
ethicalAds: {
  // Data attributes
  eaPublisher: 'my-publisher-id',
  // HTML attributes
  class: 'custom-ad',
  id: 'ea-sidebar',
  style: '--ea-background: red;'
}
```

**Output**

```html
<div
  data-ea-publisher="my-publisher-id"
  class="custom-ad"
  id="ea-sidebar"
  style="--ea-background: red;">
</div>
```

### clientURL

- Type: `String`
- Default: `"https://media.ethicalads.io/media/client/ethicalads.min.js"`

The URL of the EthicalAds client library. The plugin will inject this library via a `<script>` element in the document `<head>` automatically.

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  // Un-minified version
  clientURL: 'https://media.ethicalads.io/media/client/ethicalads.js'
}
```

### placements

- Type: `Array<Object>`
- Default: `[]`

An array of objects containing ad placement configurations with the following properties:

- All EthicalAds [data attribute](#data-attributes) properties listed above
- All [HTML attribute](#html-attributes) properties listed above
- `appendTo`: CSS selector or DOM element to *append* the placement to
- `prependTo`: CSS selector or DOM element to *prepend* the placement to
- `insertAfter`: CSS selector or DOM element to insert the placement *after*
- `insertBefore`: CSS selector or DOM element to insert the placement *before*

Each items in the placements array will render one ad placement. Specifying a CSS selector that matches multiple elements (e.g. `"h2"`) for the insertion point will render the placement based on the first matching element.

When any of these values are set directly under `$docsify.ethicalAds` they will serve as default values for items in the `placements` array.

**Example**

```js
ethicalAds: {
  // Default values for `placements`
  eaPublisher: 'my-publisher-id',
  eaType: 'text',
  class: 'custom-ad',
  // Ad placements configurations
  placements: [
    {
      insertAfter: '#main > h2',
      // Override defaults values:
      eaType: 'image',
      class: 'horizontal flat',
    },
    {
      appendTo: '#main',
      // Default values applied:
      // eaType: 'text',
      // class: 'custom-ad'
    }
  ]
}
```

**Output**

```html
<!-- Inserted after first <h2> element in `#main` element -->
<div
  data-ea-publisher="my-publisher-id"
  data-ea-type="image"
  class="horizontal flat">
</div>

<!-- Appended to `#main` element -->
<div
  data-ea-publisher="my-publisher-id"
  data-ea-type="text"
  class="custom-ad">
</div>
```

### showFooter

- Type: `Boolean|Object`
- Default: `false`

Determines if the preset fixed-footer ad placement will be rendered. When set to `true`, a fixed-position text-based placement will be rendered on the bottom site.

```js
{
  appendTo: 'main',
  eaStyle: 'fixedfooter',
  eaType: 'text',
  class: 'bordered'
}
```

To disable rending this placement, set this value to `false`. To customize this placement, set the value to a configuration object as described in the [`placements`](#placements) section. This configuration will be merged with the preset configuration above, so only modified values need to be specified.

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  showSidebar: {
    eaKeywords: 'foo|bar|baz'
  }
}
```

### showSidebar

- Type: `Boolean|Object`
- Default: `true`

Determines if the preset sidebar ad placement will be rendered. When set to `true`, an ad placement will be rendered in the sidebar above the navigation menu with the following configuration:

```js
{
  insertBefore: '.sidebar-nav',
  eaType: 'image',
  class: 'horizontal flat'
}
```

To disable rending this placement, set this value to `false`. To customize this placement, set the value to a configuration object as described in the [`placements`](#placements) section. This configuration will be merged with the preset configuration above, so only modified values need to be specified.

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  showSidebar: {
    eaKeywords: 'foo|bar|baz'
  }
}
```

## Customization

### Classes

EthicalAds offers several CSS classes for applying themes, setting orientation, and accommodating for dark mode. Classes from different groups (theme, dark mode, and orientation) can be combined as needed (e.g, `bordered horizontal` or `dark flat`).

- **Theme classes**
  - `raised`: Includes drop-shadow
  - `flat`: No drop-shadow or right/left margin in `.sidebar`
  - `bordered`: Includes 1px border
- **Dark classes**
  - `dark`: Uses `--ea-dark` custom properties
  - `adaptive`: Uses `--ea-dark` custom properties when OS-level "dark mode" is detected
- **Orientation classes**
  - `horizontal`: Renders images to the left of text

These classes can be applied using the [`class`](#html-attributes) attribute:

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  class: 'dark flat horizontal'
}
```

```html
<div data-ea-type="image" class="dark flat horizontal"></div>
```

**Examples**

<div class="ad-grid" style="align-items: flex-start; justify-content: flex-start;">
  <div>
    <p><strong>raised</strong> (default)</p>
    <div
      data-ea-publisher="jhildenbiddle-github-io"
      data-ea-type="image"
      data-ea-campaign-types="house"
      class="raised">
    </div>
  </div>
  <div>
    <p><strong>flat</strong></p>
    <div
      data-ea-publisher="jhildenbiddle-github-io"
      data-ea-type="image"
      data-ea-campaign-types="house"
      class="flat">
    </div>
  </div>
  <div>
    <p><strong>bordered</strong></p>
    <div
      data-ea-publisher="jhildenbiddle-github-io"
      data-ea-type="image"
      data-ea-campaign-types="house"
      class="bordered">
    </div>
  </div>
  <div>
    <p><strong>dark</strong></p>
    <div
      data-ea-publisher="jhildenbiddle-github-io"
      data-ea-type="image"
      data-ea-campaign-types="house"
      class="dark">
    </div>
  </div>
  <div>
    <p><strong>adaptive</strong></p>
    <div
      data-ea-publisher="jhildenbiddle-github-io"
      data-ea-type="image"
      data-ea-campaign-types="house"
      class="adaptive">
    </div>
  </div>
  <div>
    <p><strong>horizontal</strong></p>
    <div
      data-ea-publisher="jhildenbiddle-github-io"
      data-ea-type="image"
      data-ea-campaign-types="house"
      class="horizontal">
    </div>
  </div>
</div>

### Custom Properties

Ad placement styles can be customized using the CSS custom properties below. Custom properties make it easy to apply styles to individual or groups of placements without the need to write complex CSS.

```css
/* Default values shown */
:root {
  --ea-background: #f7f7f7;
  --ea-border-color: #ededed;
  --ea-border-radius: 4px;
  --ea-callout-background: #ededed;
  --ea-callout-color: 'inherit';
  --ea-callout-font-size: 10px;
  --ea-color: #444;
  --ea-font-size: 12px;
  --ea-line-height: 1.4;
  --ea-margin: 1em;
  --ea-sidebar-inset: 300px;
  --ea-sidebar-toggle-inset: 45px;
  --ea-strong-color: var(--theme-color, #42b983);

  /* Dark */
  --ea-dark-background: #1f282d;
  --ea-dark-border-color: #384951;
  --ea-dark-callout-background: #384951;
  --ea-dark-callout-color: 'inherit';
  --ea-dark-color: #fff;
  --ea-dark-strong-color: var(--ea-strong-color);
}
```

?> The default values shown above are slightly modified when a [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/) theme is detected. See the [Plugin Styles](https://jhildenbiddle.github.io/docsify-themeable/#/customization?id=plugin-styles) section of the docsify-themeable documentation for details.

The simplest way to apply custom styles is by creating "inline" styles using the [`style`](#html-attributes) attribute:

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  style: '--ea-background: red;'
}
```

```html
<div
  data-ea-publisher="my-publisher-id"
  style="--ea-background: red;">
</div>
```

CSS classes and rulesets can also be used apply custom styles by creating a `<style>` tag within the `<body>` element of your `index.html` file. This ensures that your custom styles will override those set by EthicalAds or this plugin.

```html
  <style>
    /* Custom styles */
  </style>
</body>
</html>
```

CSS classes can be used to apply custom styles to specific ad placements using the [`class`](#html-attributes) attribute:

```css
.custom-ad {
  --ea-background: red;
}
```

```js
ethicalAds: {
  eaPublisher: 'my-publisher-id',
  class: 'custom-ad',
}
```

```html
<div data-ea-publisher="my-publisher-id" class="custom-ad">
```

CSS rules can also be used to apply custom styles indirectly by targeting existing attributes or by creating "scoped" styles that apply to placements within a specified container:

```css
/* Applied to text-based placements  */
[data-ea-type="text"] {
  --ea-background: blue;
}

/* Applied to placements within the sidebar  */
.sidebar {
  --ea-background: green;
}
```

## Contact & Support

- Create a [GitHub issue](https://github.com/jhildenbiddle/docsify-plugin-ethicalads/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/docsify-plugin-ethicalads) or 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-ethicalads&hashtags=docsify,developers,frontend,javascript) to support the project!

## License

This project is licensed under the [MIT license](https://github.com/jhildenbiddle/docsify-plugin-ethicalads/blob/main/LICENSE).

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

<!-- GitHub Buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
