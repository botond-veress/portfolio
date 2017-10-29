import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '@/shared/App';

function renderer(Component) {
    return render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    );
}

renderer(App);

if (module.hot) {
    module.hot.accept('@/shared/App', () => renderer(App));
}
