import React, { Component } from 'react';

import '@/shared/config';
import '@/shared/style/base.sass';

import withMeta from '@/shared/component/withMeta';

import style from './App.sass';

class App extends Component {
    render() {
        return (
            <div className={style.hello}>
                Hello
            </div>
        );
    }
}

export default withMeta(App);
