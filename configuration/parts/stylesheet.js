import ExtractTextPlugin from 'extract-text-webpack-plugin';

export function includeExtractedStylesheet(pluginOptions, options) {
    let plugin = new ExtractTextPlugin(pluginOptions);

    return {
        plugins: [
            plugin
        ],
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    loaders: plugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: options.localIdentName,
                                    sourceMap: options.sourceMap,
                                    minimize: options.minimize,
                                    importLoaders: 1
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'resolve-url-loader'
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: options.sourceMap,
                                    includePaths: options.includePaths
                                }
                            }
                        ]
                    }),
                    exclude: /node_modules/
                }
            ]
        }
    };
}
