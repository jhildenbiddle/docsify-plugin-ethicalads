// TODO: Prevent multiple ads when navigating to new pages (sidebar and footer)

import './style.css';

const defaults = {
    // Data attributes
    eaCampaignTypes: null,
    eaForceCampaign: null,
    eaForcedAd: null,
    eaKeywords: null,
    eaPublisher: null,
    eaStyle: null,
    eaType: null,
    // HTML attributes
    class: null,
    id: null,
    style: null,
    // Placements
    showFooter: false,
    showSidebar: true,
    placements: [
        {
            // insertBefore: null,
            // appendTo: null,
            // prependTo: null,
            // insertAfter: null
        }
    ],
    // Plugin
    clientURL: 'https://media.ethicalads.io/media/client/ethicalads.min.js'
};

function camelToDashCase(str) {
    return str.replace(/([a-z])([A-Z])/g, m => m[0] + '-' + m[1].toLowerCase());
}

function isObject(obj) {
    return Boolean(obj && obj.constructor.name === 'Object');
}

function renderAd(config) {
    const insertMap = {
        appendTo: 'beforeend',
        prependTo: 'afterbegin',
        insertBefore: 'beforebegin',
        insertAfter: 'afterend'
    };

    const adElm = document.createElement('div');

    // Apply data attributes
    for (const [key, value] of Object.entries(config)) {
        if (/^ea[A-Z]/.test(key) && config[key]) {
            const dataAttr = camelToDashCase(key);

            adElm.setAttribute(`data-${dataAttr}`, value);
        }
    }

    // Apply HTML attributes
    ['class', 'id', 'style'].forEach(attr => {
        if (config[attr]) {
            adElm.setAttribute(attr, config[attr]);
        }
    });

    // Generate ad placements
    for (const [option, insertPosition] of Object.entries(insertMap)) {
        const targetVal = config[option];
        const targetElms = typeof targetVal === 'string' ? document.querySelectorAll(targetVal) : targetVal;

        if (targetElms) {
            [...targetElms].forEach(targetElm => {
                // const containerElm = (option === 'appendTo' || option === 'prependTo') ? targetElm : targetElm.parentNode;
                // const skipAd = containerElm.querySelectorAll('[data-ea-publisher], [data-ea-type]').length > 0;

                // if (!skipAd) {
                targetElm.insertAdjacentHTML(insertPosition, adElm.outerHTML);
                // }
            });
        }
    }
}

(function() {
    // Plugin
    const docsifyEthicalAds = function(hook, vm) {
        const settings = { ...defaults, ...(window.$docsify.ethicalads || {})};

        hook.init(function() {
            if (settings.eaPublisher) {
                // Add fixed-footer preset to `placements`
                if (settings.showFooter) {
                    const defaults = {
                        appendTo: 'main',
                        eaStyle: 'fixedfooter',
                        eaType: 'text',
                        class: 'bordered'
                    };
                    const config = isObject(settings.showFooter) ? { ...defaults, ...settings.showFooter } : defaults;

                    settings.placements.unshift(config);
                }

                // Add sidebar preset to `placements`
                if (settings.showSidebar) {
                    const defaults = {
                        insertBefore: '.sidebar-nav',
                        eaType: 'image',
                        class: 'horizontal flat'
                    };
                    const config = isObject(settings.showSidebar) ? { ...defaults, ...settings.showSidebar } : defaults;

                    settings.placements.unshift(config);
                }
            }
        });

        hook.doneEach(function() {
            // Remove .loaded class from EA styles to prevent flashing on reload
            const eaStyleElmFixed = document.querySelector('head style[data-src="ethicalads"]');
            const footerAd = document.querySelector('[data-ea-style="fixedfooter"]');
            const sidebarAd = document.querySelector('.sidebar [data-ea-publisher]');

            if (!eaStyleElmFixed) {
                const styleElms = [...document.querySelectorAll('head style')];

                styleElms.forEach(styleElm => {
                    const hasLoadedSelector = /\[data-ea-publisher]\.loaded/.test(styleElm.textContent);

                    if (hasLoadedSelector) {
                        styleElm.textContent = styleElm.textContent.replace(/\.loaded/g, '');
                        styleElm.setAttribute('data-src', 'ethicalads');
                    }
                });
            }

            // Render `ethicalads.placements`
            settings.placements.forEach((placement, i) => {
                const config = { ...settings, ...placement};
                const isSkipFooterAd = footerAd && config.eaStyle === 'fixedfooter';
                const isSkipSidebarAd = sidebarAd && ['appendTo', 'prependTo', 'insertBefore', 'insertAfter'].some(prop =>
                    config[prop] && [...document.querySelectorAll(config[prop])].find(elm => {
                        const matchElm = prop === 'appendTo' || prop === 'prependTo' ? elm : elm.parentNode;

                        return matchElm.matches('.sidebar, .sidebar *');
                    })
                );

                if (!isSkipFooterAd && !isSkipSidebarAd) {
                    renderAd(config);
                }
            });

            // Set `data-ea-publisher` value on static HTML elements if missing
            [...document.querySelectorAll('[data-ea-type]:not([data-ea-publisher])')].forEach(elm => {
                elm.setAttribute('data-ea-publisher', settings.eaPublisher);
            });

            // Re/load new placements
            if (window.ethicalads) {
                const loadedAdElms = [...document.querySelectorAll('[data-ea-publisher].loaded, [data-ea-type].loaded')];
                const loadedScriptElms = [...document.querySelectorAll('script[src*="ethicalads.io/api/"]')];
                const unloadedAdElms = [];

                if (loadedAdElms.length) {
                    // Remove .loaded class from existing placements to allow reloading
                    loadedAdElms.forEach(elm => {
                        elm.classList.remove('loaded');
                        unloadedAdElms.push(elm);
                    });

                    // Remove previously injected <script> elements
                    loadedScriptElms.forEach(elm => elm.parentNode.removeChild(elm));
                }

                unloadedAdElms.concat(...document.querySelectorAll('[data-ea-publisher]:not(.loaded)'));

                if (unloadedAdElms.length) {
                    window.ethicalads.load();
                }
            }
        });

        hook.ready(function() {
            // Inject EthicalAds client library
            const scriptElm = document.createElement('script');

            scriptElm.src = settings.clientURL;
            document.head.appendChild(scriptElm);
        });
    };

    // Add plugin to docsify's plugin array
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [].concat(window.$docsify.plugins || [], docsifyEthicalAds);
})();
