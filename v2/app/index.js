'use strict';

global.__root = __dirname;

const express = require('express');
const path = require('path');

const renderer = require(__root + '/renderer');

const $ = {};
$.path = {
  views: path.resolve(__root + '/views'),
  templates: path.resolve(__root + '/templates'),
  public: path.resolve(__root + '/public')
};

const init = () => {
  const app = express();

  app.use(express.static(__root + '/public'));
  app.get('/', (req, res) => res.send('Hello World!'));

  renderer.render();

  app.listen(18660, () => console.log('Example app listening on port 18660!'));
};

init();

module.exports = $;
