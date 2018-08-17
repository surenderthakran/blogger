'use strict';

global.__root = __dirname;

const express = require('express');

const watchers = require(__root + '/watchers');

const $ = {};

const initPaths = () => {
  $.public = __root + '/public';
};

const initServer = () => {
  const app = express();

  app.use(express.static(__root + '/public'));

  app.get('/projects', (req, res) => {
    res.sendFile($.public + '/projects.html');
  });

  app.get('/about', (req, res) => {
    res.sendFile($.public + '/about.html');
  });

  app.use(function (req, res, next) {
    res.status(404).sendFile($.public + '/404.html');
  });

  app.listen(
      18660, () => console.log('\nExample app listening on port 18660!'));
};

const init = () => {
  if (process.env.NODE_ENV === 'development') {
    watchers.set();
  }

  initPaths();

  initServer();
};

init();

module.exports = $;
