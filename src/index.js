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

    // Data attributes
    for (const [key, value] of Object.entries(config)) {
        if (/^ea[A-Z]/.test(key) && config[key]) {
            const dataAttr = camelToDashCase(key);

            adElm.setAttribute(`data-${dataAttr}`, value);
        }
    }

    // HTML attributes
    ['class', 'id', 'style'].forEach(attr => {
        if (config[attr]) {
            adElm.setAttribute(attr, config[attr]);
        }
    });

    // Generate ad elements
    for (const [option, insertPosition] of Object.entries(insertMap)) {
        const targetVal = config[option];
        const targetElms = typeof targetVal === 'string' ? document.querySelectorAll(targetVal) : targetVal;

        if (targetElms) {
            [...targetElms].forEach(targetElm => {
                targetElm.insertAdjacentHTML(insertPosition, adElm.outerHTML);
            });
        }
    }
}

(function() {
    // Plugin
    const docsifyEthicalAds = function(hook, vm) {
        const settings = { ...defaults, ...(window.$docsify.ethicalads || {})};

        // Preset: fixedfooter
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

        // Preset: sidebar
        if (settings.showSidebar) {
            const defaults = {
                insertBefore: '.sidebar-nav',
                eaType: 'image',
                class: 'horizontal flat'
            };
            const config = isObject(settings.showSidebar) ? { ...defaults, ...settings.showSidebar } : defaults;

            settings.placements.unshift(config);
        }

        hook.ready(function() {
            const scriptElm = document.createElement('script');

            scriptElm.src = settings.clientURL;
            document.body.appendChild(scriptElm);
        });

        hook.doneEach(function() {
            if (!window.$docsify.ethicalads) {
                return;
            }

            // Render `ethicalads.placements`
            settings.placements.forEach(placement => {
                const config = { ...settings, ...placement};

                renderAd(config);
            });

            // Set `data-ea-publisher` value on static HTML elements if missing
            [...document.querySelectorAll('[data-ea-type]:not([data-ea-publisher])')].forEach(elm => {
                elm.setAttribute('data-ea-publisher', settings.eaPublisher);
            });

            if (window.ethicalads) {
                const loadedAdElms = [...document.querySelectorAll('[data-ea-publisher].loaded, [data-ea-type].loaded')];

                loadedAdElms.forEach(elm => {
                    elm.classList.remove('loaded');
                });

                window.ethicalads.load();

                loadedAdElms.forEach(elm => {
                    // elm.parentNode.removeChild(elm);
                });
            }
        });
    };

    // Add plugin to docsify's plugin array
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [].concat(window.$docsify.plugins || [], docsifyEthicalAds);
})();
