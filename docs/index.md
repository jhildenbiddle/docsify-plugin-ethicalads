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
    data-ea-type="image">
  </div>
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="image"
    class="horizontal custom-ad1">
  </div>
</div>

<div class="ad-grid">
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="text"
    style="flex: 1 1 300px;">
  </div>
  <div
    data-ea-publisher="jhildenbiddle-github-io"
    data-ea-type="text"
    class="custom-ad2"
    style="flex: 1 1 300px;">
  </div>
</div>

## Features

- Render ad placements from [EthicalAds](https://www.ethicalads.io/) within docsify sites
- Supports multiple ad placements and locations (sidebar, footer, per page, etc.)
- Configure placements using EthicalAds [API options](https://ethical-ad-client.readthedocs.io/)
- Customize styles using CSS custom properties
- Compatible with [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/) themes

?> Like this plugin? Be sure to check out [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable) for your site theme, [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/) for tabbed content, and [docsify-plugin-runkit](https://jhildenbiddle.github.io/docsify-plugin-runkit/) for live JavaScript REPLs!

## Installation

1. Apply to [become a publisher](https://www.ethicalads.io/publishers/) on the [EthicalAds](https://www.ethicalads.io/) network. You will need a valid publisher ID to render ad placements on your site.

1. Add the plugin to your `index.html` after docsify:

   ```html
   <!-- docsify (latest v4.x.x)-->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4"></script>

   <!-- docsify-plugin-ethicalads (latest v1.x.x) -->
   <script src="https://cdn.jsdelivr.net/npm/docsify-plugin-ethicalads@1"></script>
   ```

   The plugin is available on [jsdelivr](https://www.jsdelivr.com/package/npm/docsify-plugin-ethicalads) (above), [unpkg](https://unpkg.com/browse/docsify-plugin-ethicalads/), and other CDN services that auto-publish npm packages.

   If you prefer to download and bundle the plugin, it is also available on npm:

   ```bash
   npm install docsify-plugin-ethicalads
   ```

1. Review the [options](#options) section and configure as needed:

   ```html
   <script>
     window.$docsify = {
       // ...
       ethicalads: {
         publisher: 'my-publisher-id',
         // More options...
       }
     };
   </script>
   ```

## Usage

### Preset placements

The plugin has two preset ad placements: one in the sidebar and one set using a fixed-footer element.

By default, the plugin will render the preset placement in the sidebar. To prevent his behavior, set the [`showSidebar`](#showsidebar) option to `false`:

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
  showSidebar: false
}
```

Similarly, to render the preset fixed-footer placement, set [`showFooter`](#showfooter) to `true`:

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
  showFooter: true
}
```

### Dynamic placements

The [`placements`](#placements) option allows defining multiple ad placements and configuration options via the `$docisfy.ethicalads` configuration object.

For example, here is a sample configuration for rendering a simpler text-based placement in the sidebar as well as a text-based placement after the first `<h2>` element on every markdown page:

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
  showSidebar: false,
  placements: [
    {
        insertBefore: '.sidebar-nav',
        type: 'text'
    },
    {
        insertAfter: '#main > h2:first-of-type',
        type: 'text',
        keywords: 'foo|bar|baz'
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

Note that if a `data-ea-publisher` attribute is omitted but a `data-ea-type` attribute is added, the plugin will automatically set the missing publisher attribute to the [`publisher`](#data-attributes) option value.

## Options

Options are set using the `ethicalads` property of the [`window.$docsify`](https://docsify.js.org/#/configuration) configuration object:

```javascript
window.$docsify = {
  // ...
  ethicalads: {
    publisher: 'my-publisher-id',
    campaignTypes: 'paid|community',
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

- `publisher`: EthicalAds publisher id for your account
- `type`: Ad placement type. Value can be either `image` (default) or `text`.
- `keywords`: A pipe (`|`) separated array of keywords for this ad placement
- `campaignTypes`: A pipe (`|`) separated array of campaign types
- `forcedAd`: Specifies an ad placement for testing
- `forceCampaign`: Specifies a campaign (group of ads) for testing

?> For additional details on these options, see the official [EthicalAds documentation](https://ethical-ad-client.readthedocs.io/).

**Example**

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
  // Data attributes
  type: 'text',
  campaignTypes: 'paid|community',
  keywords: 'foo|bar|baz'
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

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
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

The URL of the EthicalAds client library. The plugin will inject this library via a `<script>` element in the document `<head>` automatically.

- Type: `String`
- Default: `"https://media.ethicalads.io/media/client/ethicalads.min.js"`

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
  // Un-minified version
  clientURL: 'https://media.ethicalads.io/media/client/ethicalads.js'
}
```

### placements

- Type: `Array<Object>`
- Default: `[]`

An array of objects containing ad placement configurations with the following options:

- All EthicalAds [data attributes](#data-attributes) listed above
- All [HTML attributes](#html-attributes) listed above
- `appendTo`: CSS selector or DOM element to *append* the placement to
- `prependTo`: CSS selector or DOM element to *prepend* the placement to
- `insertAfter`: CSS selector or DOM element to insert the placement *after*
- `insertBefore`: CSS selector or DOM element to insert the placement *before*

Note that when these values are set directly under the `$docsify.ethicalads` property they will serve as default values for configurations found in the `placements` array.

**Example**

```javascript
ethicalads: {
  publisher: 'my-publisher-id',
  showSidebar: false,
  // Default values
  type: 'text',
  class: 'custom-ad',
  placements: [
    {
        insertBefore: '.sidebar-nav',
        type: 'image',
        class: 'horizontal flat',
    },
    {
        insertAfter: '#main > h2:first-of-type',
        keywords: 'foo|bar|baz'
    }
  ]
}
```

**Output**

```html
<!-- Inserted before `.sidebar-nav` element -->
<div
  data-ea-publisher="my-publisher-id"
  data-ea-type="image"
  class="horizontal flat">
</div>

<!-- Inserted after the first <h2> inside of `#main` element -->
<div
  data-ea-publisher="my-publisher-id"
  data-ea-type="text"
  class="custom-ad"
  data-ea-keywords="foo|bar|baz">
</div>
```

### showFooter

Determines if the preset fixed-footer ad placement will be rendered.

- Type: `Boolean`
- Default: `false`

### showSidebar

Determines if the preset sidebar ad placement will be rendered.

- Type: `Boolean`
- Default: `true`

## Contact & Support

- Create a [GitHub issue](https://github.com/jhildenbiddle/docsify-plugin-ethicalads/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/docsify-plugin-ethicalads) or 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-ethicalads&hashtags=docsify,developers,frontend,javascript) to support the project!

## License

This project is licensed under the [MIT license](https://github.com/jhildenbiddle/docsify-plugin-ethicalads/blob/main/LICENSE).

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

<!-- GitHub Buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
