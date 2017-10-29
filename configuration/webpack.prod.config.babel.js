import {
    DefinePlugin,
    HashedModuleIdsPlugin,
    LoaderOptionsPlugin
} from 'webpack';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';

import {
    browserConfiguration,
    serverConfiguration,
    HOST,
    PORT,
    PATH_SRC,
    PATH_DIST
} from './webpack.common.config.babel';
import {
    includeImage,
    loadImage,
    processImage,
    includeExtractedStylesheet,
    includeIcons,
} from './parts';

const browserConfig = merge(
    browserConfiguration,
    {
        plugins: [
            new HashedModuleIdsPlugin(),
            new UglifyJsPlugin({
                sourceMap: true,
                beautify: false,
                mangle: { screw_ie8 : true },
                compress: { screw_ie8: true },
                comments: false
            }),
            // new DefinePlugin({
            //     'process.env': {
            //         NODE_ENV: JSON.stringify('production')
            //     }
            // }),
            new LoaderOptionsPlugin({
                options: {
                    context: path.resolve(PATH_SRC),
                    output: {
                        path: path.resolve(PATH_DIST)
                    }
                }
            }),
            new FaviconsWebpackPlugin({
                logo: path.resolve(PATH_SRC, 'shared/image/favicon.png'),
                prefix: 'favicon/[hash]',
                persistentCache: false,
                inject: true,
                background: '#fff',
                title: 'Portfolio',
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    opengraph: false,
                    twitter: false,
                    yandex: true,
                    windows: true
                }
            })
        ],
        target: 'web',
        output: {
            path: path.resolve(PATH_DIST),
            pathinfo: true,
            filename: 'script/[name]-[chunkhash].bundle.js',
            chunkFilename: 'script/[id]-[chunkhash].chunk.js',
            publicPath: '/'
        },
        devtool: 'source-map'
    },
    includeExtractedStylesheet({
        filename: 'stylesheet/[name]-[contenthash].css',
        allChunks: true,
        ignoreOrder: true
    }, {
        localIdentName: '[hash:base64:5]',
        minimize: true,
        includePaths: [
            path.resolve(PATH_SRC)
        ],
        sourceMap: true
    }),
    includeImage([
        loadImage({
            name: '[name]-[hash].[ext]',
            outputPath: 'image/'
        }),
        processImage()
    ]),
    includeIcons({
        name: '[name]-[hash].[ext]',
        outputPath: 'font/'
    })
);

const serverConfig = merge(
    serverConfiguration,
    {
        plugins: [
            new HashedModuleIdsPlugin(),
            new UglifyJsPlugin({
                sourceMap: true,
                beautify: false,
                mangle: { screw_ie8 : true },
                compress: { screw_ie8: true },
                comments: false
            }),
            // new DefinePlugin({
            //     'process.env': {
            //         NODE_ENV: JSON.stringify('production')
            //     }
            // }),
            new LoaderOptionsPlugin({
                options: {
                    context: path.resolve(PATH_SRC),
                    output: {
                        path: path.resolve(PATH_DIST)
                    }
                }
            }),
            new FaviconsWebpackPlugin({
                logo: path.resolve(PATH_SRC, 'shared/image/favicon.png'),
                prefix: './',
                persistentCache: false,
                inject: true,
                background: '#fff',
                title: 'Portfolio',
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false
                }
            })
        ],
        output: {
            path: path.resolve(PATH_DIST),
            filename: 'server.js',
            libraryTarget: 'commonjs2'
        },
        devtool: 'source-map'
    },
    includeExtractedStylesheet({
        filename: 'stylesheet/[name]-[contenthash].css',
        allChunks: true,
        ignoreOrder: true
    }, {
        localIdentName: '[hash:base64:5]',
        minimize: true,
        includePath: path.resolve(PATH_SRC),
        sourceMap: true
    }, true),
    includeImage([
        loadImage({
            name: '[name]-[hash].[ext]',
            outputPath: 'image/',
            emit: false
        })
    ]),
    includeIcons({
        name: '[name]-[hash].[ext]',
        outputPath: 'font/',
        emit: false
    })
);

export default [browserConfig, serverConfig];
