import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import React from 'react';

import { renderToString } from 'react-dom/server';
import App from '@/shared/App';

// eslint-disable-next-line no-console
console.log("CONFIGURATION:", JSON.stringify(process.env, null, 2));

const PORT = process.env.PORT || 3000;
const DIR = './dist';

const readFile = Promise.promisify(fs.readFile);
const file = path.resolve(DIR, 'index.html');

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
        response.send(`${left}${renderToString(<App />)}${right}`);
    });

    app.use(express.static(DIR));

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is listening on :${PORT}...`);
    });
}

readFile(file, 'utf8').then((content) => {
    let part = splitIndexBy(content, 'id="app">');

    if (!part) {
        return Promise.reject(new Error('Element with id "app" not found.'));
    }

    return createServer(part.left, part.right);
}).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
});

