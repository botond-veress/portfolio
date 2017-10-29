import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import React from 'react';

import { renderToString } from 'react-dom/server';
import LandingApp from '@/shared/landing/LandingApp';

const readFile = Promise.promisify(fs.readFile);
const file = path.resolve('./dist/index.html');

function splitIndexBy(content, term) {
    let index = content.indexOf(term);

    if (index < 0) {
        return null;
    }

    return {
        left: content.substr(0, index + term.length),
        right: content.substr(index + term.length)
    };
}

function createServer(left, right) {
    const app = express();

    app.get('/', (request, response) => {
        response.send(`${left}${renderToString(<LandingApp />)}${right}`);
    });

    app.use(express.static('./dist'));

    app.listen(process.env.PORT || 3101, () => {
        // eslint-disable-next-line no-console
        console.log('Server is listening...');
    });
}

readFile(file, 'utf8').then((content) => {
    let part = splitIndexBy(content, 'id="app">');

    if (!part) {
        return Promise.reject('Container with id "app" not found.');
    }

    return createServer(part.left, part.right);
}).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
});

