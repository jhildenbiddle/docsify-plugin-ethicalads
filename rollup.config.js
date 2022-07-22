// Dependencies
// =============================================================================
const path = require('path');

import { babel }       from '@rollup/plugin-babel';
import commonjs        from '@rollup/plugin-commonjs';
import { eslint }      from 'rollup-plugin-eslint';
import json            from '@rollup/plugin-json';
import merge           from 'lodash.merge';
import pkg             from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import styles          from 'rollup-plugin-styles';
import { terser }      from 'rollup-plugin-terser';


// Settings
// =============================================================================
// Copyright
const currentYear  = (new Date()).getFullYear();
const releaseYear  = 2022;

// Output
const entryFile  = path.resolve(__dirname, 'src', 'index.js');
const outputFile = path.resolve(__dirname, 'dist', `${pkg.name}.js`);

// Banner
const bannerData = [
    `${pkg.name}`,
    `v${pkg.version}`,
    `${pkg.homepage}`,
    `(c) ${releaseYear}${currentYear === releaseYear ? '' : '-' + currentYear} ${pkg.author}`,
    `${pkg.license} license`
];

// Plugins
const pluginSettings = {
    eslint: {
        exclude       : ['node_modules/**', './package.json', './src/**/*.{css,scss}'],
        throwOnWarning: false,
        throwOnError  : true
    },
    babel: {
        // See .babelrc
        babelHelpers: 'bundled'
    },
    terser: {
        beautify: {
            compress: false,
            mangle  : false,
            output: {
                beautify: true,
                comments: /(?:^!|@(?:license|preserve))/
            }
        },
        minify: {
            compress: true,
            mangle  : true,
            output  : {
                comments: new RegExp(pkg.name)
            }
        }
    }
};


// Config
// =============================================================================
// Base
const config = {
    input : entryFile,
    output: {
        banner   : `/*!\n * ${ bannerData.join('\n * ') }\n */`,
        file     : outputFile,
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        eslint(pluginSettings.eslint),
        babel(pluginSettings.babel),
        styles({
            mode: [
                'inject', {
                    container: 'body',
                    singleTag: true,
                    prepend: true,
                    attributes: { 'data-src': pkg.name }
                }
            ],
        })
    ],
    watch: {
        clearScreen: false
    }
};

// Formats
// -----------------------------------------------------------------------------
// IIFE
const iife = merge({}, config, {
    output: {
        format: 'iife'
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.beautify)
    ])
});

// IIFE (Minified)
const iifeMinified = merge({}, config, {
    output: {
        file  : iife.output.file.replace(/\.js$/, '.min.js'),
        format: iife.output.format
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.minify)
    ])
});


// Exports
// =============================================================================
export default [
    iife,
    iifeMinified
];
