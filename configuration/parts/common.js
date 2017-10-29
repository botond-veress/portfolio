export function resolveModules(src) {
    return {
        resolve: {
            extensions: [
                '.js',
                '.jsx'
            ],
            alias: {
                '@': src
            },
            modules: [
                src,
                'node_modules'
            ]
        }
    };
}
