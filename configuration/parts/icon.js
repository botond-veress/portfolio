export function includeIcons(options) {
    return {
        module: {
            rules: [
                {
                    test: /fonts\/.*\.(ttf|eot|woff|woff2?|svg)$/,
                    loader: 'file-loader',
                    options
                }
            ]
        }
    };
}
