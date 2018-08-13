'use strict';

global.__root = __dirname + '/';

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(18660, () => console.log('Example app listening on port 18660!'));
