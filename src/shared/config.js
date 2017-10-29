// eslint-disable-next-line
var CONFIGURATION;
const config = CONFIGURATION || {};

if (config.verbose) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(config, null, 2));
}

export default {
    version: config.version
};
