import yargs from 'yargs';
import path from 'path';
import webpack, { DefinePlugin } from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pack from '../package.json';

import {
    includeJavascript,
    lintJavaScript,
    resolveModules
} from './parts';

export const args = yargs
    .option('port', {
        describe: 'Listen on port while in development',
        number: true,
        default: 3100
    })
    .option('env.configuration', {
        describe: 'Pass environment variables to the application',
        default: {}
    })
    .argv;

const configuration = merge({
    version: pack.version
}, args.env.configuration || {});

export const HOST = '0.0.0.0';
export const PORT = args.port;

export const PATH_SRC  = './src';
export const PATH_DIST = process.env.OUTPUT_DIR || './dist';

export const browserConfiguration = merge(
    {
        entry: {
            app: [
                path.resolve(PATH_SRC, 'browser/index.jsx'),
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(PATH_SRC, 'index.html'),
                minify: {}
            }),
            new DefinePlugin({
                CONFIGURATION: prepareConfiguration(configuration)
            })
        ],
    },
    includeJavascript(),
    lintJavaScript(),
    resolveModules(path.resolve(PATH_SRC))
);

// export const serverConfiguration = merge(
//     {
//         entry: path.resolve(PATH_SRC, 'server/index.jsx'),
//         target: 'node',
//         output: {
//             path: path.resolve(PATH_DIST),
//             filename: 'server.js',
//             libraryTarget: 'commonjs2'
//         },
//         plugins: [
//             new DefinePlugin(prepareConfiguration(configuration))
//         ]
//     },
//     includeJavascript(),
//     lintJavaScript(),
//     resolveModules(path.resolve(PATH_SRC))
// );

function prepareConfiguration(configuration = {}) {
    Object.keys(configuration).forEach((key) => {
        configuration[key] = JSON.stringify(configuration[key]);
    });

    return configuration;
}
