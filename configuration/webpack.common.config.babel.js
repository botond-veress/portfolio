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

const CONFIGURATION = serialize({
    api: process.env.api,
    version: pack.version
});

export const PATH_SRC  = './src';
export const PATH_DIST = './dist';

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
            new DefinePlugin(merge({
                'process.env': serialize({
                    NODE_ENV: process.env.NODE_ENV,
                }),
                CONFIGURATION
            }))
        ],
    },
    includeJavascript(),
    lintJavaScript(),
    resolveModules(path.resolve(PATH_SRC))
);

export const serverConfiguration = merge(
    {
        entry: path.resolve(PATH_SRC, 'server/index.jsx'),
        plugins: [
            new DefinePlugin(merge({
                CONFIGURATION
            }))
        ],
        target: 'node'
    },
    includeJavascript(),
    lintJavaScript(),
    resolveModules(path.resolve(PATH_SRC))
);


function serialize(data = {}) {
    Object.keys(data).forEach((key) => {
        data[key] = JSON.stringify(data[key]);
    });

    return data;
}
