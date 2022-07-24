import './style.css';

const defaults = {
    clientURL: 'https://media.ethicalads.io/media/client/ethicalads.min.js',
    placements: [
        {
            // insertBefore: null,
            // appendTo: null,
            // prependTo: null,
            // insertAfter: null
        }
    ],
    // Default placements
    showFooter: false,
    showSidebar: true,
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
};

function renderAd(config) {
    const attrs = [
        'class',
        'id',
        'style'
    ].filter(v => config[v]);
    const dataAttrs = [
        'campaignTypes',
        'forceCampaign',
        'forcedAd',
        'keywords',
        'publisher',
        'type'
    ].filter(v => config[v]);
    const insertMap = {
        appendTo: 'beforeend',
        prependTo: 'afterbegin',
        insertBefore: 'beforebegin',
        insertAfter: 'afterend'
    };

    const adElm = document.createElement('div');

    attrs.forEach(v => adElm.setAttribute(v, config[v]));
    dataAttrs.forEach(v => {
        // camelCase to dash-case
        const dataAttr = v.replace(/([a-z])([A-Z])/g, m => m[0] + '-' + m[1].toLowerCase());

        adElm.setAttribute(`data-ea-${dataAttr}`, config[v]);
    });

    // Generate ad elements
    for (const [option, insertPosition] of Object.entries(insertMap)) {
        const targetVal = config[option];
        const targetElm = typeof targetVal === 'string' ? document.querySelector(targetVal) : targetVal;

        if (targetElm) {
            targetElm.insertAdjacentHTML(insertPosition, adElm.outerHTML);
        }
    }
}

(function() {
    // Plugin
    const docsifyEthicalAds = function(hook, vm) {
        const settings = { ...defaults, ...(window.$docsify.ethicalads || {})};

        // Push default ad placements
        if (settings.showFooter) {
            settings.placements.unshift({
                appendTo: 'main',
                class: 'bordered',
                style: 'fixedfooter',
                type: 'text'
            });
        }
        if (settings.showSidebar) {
            settings.placements.unshift({
                insertBefore: '.sidebar-nav',
                class: 'horizontal flat',
                type: 'image'
            });
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

            settings.placements.forEach(placement => {
                const config = { ...settings, ...placement};

                renderAd(config);
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
