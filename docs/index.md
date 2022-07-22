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

TBD

## Features

- Render ad placements from [EthicalAds](https://www.ethicalads.io/)

?> Like docsify-plugin-ethicalads? Be sure to check out [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable) for your site theme and [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/) for tabbed content!

## Installation

1. Add the plugin to your `index.html` after docsify.

   ```html
   <!-- docsify (latest v4.x.x)-->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4"></script>

   <!-- docsify-plugin-ethicalads (latest v1.x.x) -->
   <script src="https://cdn.jsdelivr.net/npm/docsify-plugin-ethicalads@1"></script>
   ```

1. Review the [options](#options) section and configure as needed.

   ```javascript
   window.$docsify = {
     // ...
     ethicalads: {
       // Options...
     }
   };
   ```

## Usage

TBD

## Options

?> Note: For an up-to-date list of options, please see ethicalads's EthicalAds' [official documentation](https://ethical-ad-client.readthedocs.io/).

Default options are set via the `ethicalads` property of the [`window.$docsify`](https://docsify.js.org/#/configuration) configuration object:

```html
<script>
  window.$docsify = {
    // ...
    ethicalads: {
      clientURL: 'https://media.ethicalads.io/media/client/ethicalads.min.js',
      // Ad attributes
      class: null,
      id: null,
      // Ad `data-ea` attributes
      campaignTypes: null,
      forceCampaign: null,
      forcedAd: null,
      keywords: null,
      manual: null,
      publisher: null,
      style: null,
      type: null
      // Ad placements
      placements: [
          {
              class: 'horizontal',
              insertBefore: '.sidebar-nav',
              appendTo: null,
              prependTo: null,
              insertAfter: null
          }
      ],
    }
  };
</script>
```

### clientURL

Environment variables for the execution environment. Available under `process.env`.

- Type: `string`
- Default: `"https://media.ethicalads.io/media/client/ethicalads.min.js"`

```javascript
ethicalads: {
  // Un-minified version
  clientURL: 'https://media.ethicalads.io/media/client/ethicalads.js'
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
