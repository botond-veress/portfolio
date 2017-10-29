export function devServer({ contentBase, filename, publicPath, host, port }) {
    return {
        devServer: {
            contentBase,
            filename,
            publicPath,
            historyApiFallback: true,
            host: host,
            port: port,
            disableHostCheck: true,
            hot: true,
            stats: 'errors-only',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    };
}
