'use strict';

global.__root = __dirname + '/';

const express = require('express');

const renderer = require(__root + 'renderer');

renderer.render();

const app = express();

app.use(express.static(__root + '/public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(18660, () => console.log('Example app listening on port 18660!'));
