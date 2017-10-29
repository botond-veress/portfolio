import React from 'react';
import { Helmet } from 'react-helmet';

import shareImage from '@/shared/image/share.png';

const APP_TITLE = 'Portfolio';
const APP_DESCRIPTION = 'Collaborative smart calendar for your finances with a spark of AI.';
const APP_SHARE_IMAGE = shareImage;

function getComponentDisplayName(component) {
    if (typeof component === 'function') {
        return component.displayName || component.name || 'Component';
    }

    if (typeof component === 'string') {
        return component;
    }

    return 'Unknown';
}

function getComponentName(...components) {
    return components.length > 1
        ? `${getComponentDisplayName(components.shift())}(${getComponentName(...components)})`
        : getComponentDisplayName(components.shift());
}

export default function withMeta(Component) {
    const WithMeta = (props) => {
        return (
            <div>
                <Helmet>
                    <title>{APP_TITLE}</title>

                    <meta name="description" content={APP_DESCRIPTION} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={APP_TITLE} />
                    <meta name="twitter:description" content={APP_DESCRIPTION} />
                    <meta name="twitter:image" content={APP_SHARE_IMAGE} />

                    <meta property="og:title" content={APP_TITLE} />
                    <meta property="og:type" content="website" />
                    {/* <meta property="og:url" content={APP_CANONICAL_URL} /> */}
                    <meta property="og:image" content={APP_SHARE_IMAGE} />
                    <meta property="og:description" content={APP_DESCRIPTION} />
                    <meta property="og:site_name" content={APP_TITLE} />
                </Helmet>

                <Component {...props} />
            </div>
        );
    };

    WithMeta.displayName = getComponentName('WithMeta', Component);

    return WithMeta;
}
