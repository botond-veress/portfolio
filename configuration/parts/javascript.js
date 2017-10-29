export function includeJavascript() {
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        babelrc: false,
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread'
                        ],
                        presets: [
                            'react',
                            [
                                'es2015',
                                {
                                    modules: false
                                }
                            ]
                        ]
                    }
                }
            ]
        }
    };
}

export function lintJavaScript() {
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    enforce: 'pre'
                }
            ]
        }
    };
}
