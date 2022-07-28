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

const adHTMLAttrs = ['class', 'id', 'style'];
const adIgnoreKeys = ['clientURL', 'placements', 'showFooter', 'showSidebar'];

function camelToDashCase(str) {
    return str.replace(/([a-z])([A-Z])/g, m => m[0] + '-' + m[1].toLowerCase());
}

function isObject(obj) {
    return Boolean(obj && obj.constructor.name === 'Object');
}

function renderAd(config) {
    const sidebarAd = document.querySelector('.sidebar [data-ea-publisher].loaded');
    const isSkipFixedFooterAd = config.eaStyle === 'fixedfooter' && document.querySelector('[data-ea-style="fixedfooter"]');
    const isSkipStickyBoxAd = config.eaStyle === 'stickybox' && document.querySelector('[data-ea-style="stickybox"]');

    const insertMap = {
        appendTo: 'beforeend',
        prependTo: 'afterbegin',
        insertBefore: 'beforebegin',
        insertAfter: 'afterend'
    };

    // Skip rendering of duplicate special placement
    if (isSkipFixedFooterAd || isSkipStickyBoxAd) {
        return;
    }

    const adElm = document.createElement('div');
    const dataAttrs = Object.keys(config).filter(key => config[key] && /^ea[A-Z]/.test(key));
    const htmlAttrs = adHTMLAttrs.filter(key => config[key]);

    dataAttrs.forEach(v => {
        const dataAttr = camelToDashCase(v);

        adElm.setAttribute(`data-${dataAttr}`, config[v]);
    });

    htmlAttrs.forEach(v => {
        adElm.setAttribute(v, config[v]);
    });

    // Generate ad placements
    for (const [option, insertPosition] of Object.entries(insertMap)) {
        const targetVal = config[option];
        const targetElm = typeof targetVal === 'string' ? document.querySelector(targetVal) : targetVal;

        if (targetElm) {
            const matchElm = option === 'appendTo' || option === 'prependTo' ? targetElm : targetElm.parentNode;
            const isSkipSidebarAd = sidebarAd && matchElm.matches('.sidebar, .sidebar *');

            // Skip rendering of duplicate sidebar placement
            !isSkipSidebarAd && targetElm.insertAdjacentHTML(insertPosition, adElm.outerHTML);
        }
    }
}

(function() {
    // Plugin
    const docsifyEthicalAds = function(hook, vm) {
        const settings = { ...defaults, ...(window.$docsify.ethicalAds || {})};
        const adDefaults = Object.fromEntries(
            Object.entries(settings)
                .filter(([key, value]) => value && !adIgnoreKeys.includes(key))
        );

        hook.init(function() {
            if (settings.eaPublisher) {
                // Add fixed-footer preset to `placements`
                if (settings.showFooter) {
                    const defaults = {
                        appendTo: 'main',
                        eaStyle: 'fixedfooter',
                        eaType: 'text',
                        class: 'adaptive bordered'
                    };
                    const config = isObject(settings.showFooter) ? { ...defaults, ...settings.showFooter } : defaults;

                    settings.placements.unshift(config);
                }

                // Add sidebar preset to `placements`
                if (settings.showSidebar) {
                    const defaults = {
                        insertBefore: '.sidebar-nav',
                        eaType: 'image',
                        class: 'adaptive flat horizontal'
                    };
                    const config = isObject(settings.showSidebar) ? { ...defaults, ...settings.showSidebar } : defaults;

                    settings.placements.unshift(config);
                }
            }
        });

        hook.doneEach(function() {
            // Remove .loaded class from EA styles to prevent flashing on reload
            const eaStyleElmFixed = document.querySelector('head style[data-src="ethicalads"]');

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
                const config = { ...adDefaults, ...placement};

                if (config.eaPublisher) {
                    renderAd(config);
                }
                else {
                    // eslint-disable-next-line no-console
                    console.error('docsify-plugin-ethicalads: Missing publisher ID', settings.placements[i]);
                }
            });

            // Set `data-ea-publisher` value on static HTML elements if missing
            const eaElmsWithoutPublisher = [...document.querySelectorAll('[data-ea-type]:not([data-ea-publisher])')];

            if (eaElmsWithoutPublisher.length) {
                if (settings.eaPublisher) {
                    eaElmsWithoutPublisher.forEach(elm => {
                        elm.setAttribute('data-ea-publisher', settings.eaPublisher);
                    });
                }
                else {
                    // eslint-disable-next-line no-console
                    console.error('docsify-plugin-ethicalads: Missing publisher ID', eaElmsWithoutPublisher);
                }
            }

            // Re/load new placements
            if (window.ethicalAds) {
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
                    window.ethicalAds.load();
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
