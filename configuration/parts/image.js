import merge from 'webpack-merge';

export function loadImage(options) {
    return {
        loader: 'file-loader',
        options
    };
}

export function processImage(options) {
    return {
        loader: 'img-loader',
        options: merge({
            gifsicle: false,
            mozjpeg: {
                progressive: true,
                arithmetic: false
            },
            pngquant: {
                floyd: 0.5,
                speed: 2
            },
            svgo: {
                plugins: [
                    {
                        removeTitle: true
                    },
                    {
                        convertPathData: false
                    }
                ]
            }
        }, options)
    };
}

export function includeImage(loaders) {
    return {
        module: {
            rules: [
                {
                    test: /\/image\/.+\.(png|jpg|svg)/,
                    loaders
                }
            ]
        }
    };
}
