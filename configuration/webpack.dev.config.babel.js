import {
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
    NoEmitOnErrorsPlugin,
    LoaderOptionsPlugin
} from 'webpack';
import merge from 'webpack-merge';
import path from 'path';

import {
    browserConfiguration,
    serverConfiguration,
    PATH_SRC,
    PATH_DIST
} from './webpack.common.config.babel';
import {
    includeImage,
    loadImage,
    includeExtractedStylesheet,
    includeIcons,
    devServer,
    resolveModules
} from './parts';

const HOST = '0.0.0.0';
const PORT = process.env.PORT;

const browserConfig = merge(
    {
        entry: {
            app: [
                'react-hot-loader/patch',
                `webpack-dev-server/client?http://${HOST}:${PORT}`,
                'webpack/hot/only-dev-server',
            ]
        }
    },
    browserConfiguration,
    {
        plugins: [
            new HotModuleReplacementPlugin(),
            new NamedModulesPlugin(),
            new NoEmitOnErrorsPlugin(),
            new LoaderOptionsPlugin({
                options: {
                    context: path.resolve(PATH_SRC),
                    output: {
                        path: path.resolve(PATH_DIST)
                    }
                }
            })
        ],
        target: 'web',
        output: {
            path: path.resolve(PATH_DIST),
            pathinfo: true,
            filename: 'script/[name].bundle.js',
            chunkFilename: 'script/[id].chunk.js',
            publicPath: '/'
        },
        devtool: 'cheap-module-eval-source-map',
    },
    includeExtractedStylesheet({
        filename: 'stylesheet/[name].css',
        allChunks: true,
        ignoreOrder: true
    }, {
        localIdentName: '[name]-[local]',
        includePaths: [
            path.resolve(PATH_SRC)
        ],
        sourceMap: true
    }),
    includeImage([
        loadImage({
            name: '[name]-[hash:4].[ext]',
            outputPath: 'image/'
        })
    ]),
    includeIcons({
        name: '[name].[ext]',
        outputPath: 'font/'
    }),
    devServer({
        contentBase: path.resolve(PATH_DIST),
        host: HOST,
        port: PORT
    })
);

export default browserConfig;
