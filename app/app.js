'use strict';

global.__root = __dirname;

// Global requires.
const path = require('path');

// NPM requires.
const compression = require('compression');
const express = require('express');

// Local requires.
const articleStore = require(__root + '/datastore/articlestore');
const watchers = require(__root + '/watchers');

const port = 18660;
const publicPath = path.join(__root, '/public/');

const initServer = () => {
  const app = express();
  // Treats /foo and /foo/ routes differently.
  app.enable('strict routing');

  app.use(compression());

  app.use(express.static(publicPath));

  app.get('/projects', (req, res) => {
    res.sendFile(path.join(publicPath, '/projects.html'));
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(publicPath, '/about.html'));
  });

  // Register article routes.
  articleStore.forEach((article) => {
    app.get('/' + article.url, (req, res) => {
      res.sendFile(path.join(publicPath, req.url + '.html'));
    });
  });

  app.use((req, res, next) => {
    res.status(404).sendFile(path.join(publicPath, '/404.html'));
  });

  app.listen(
      port, () => console.log(`\nExample app listening on port ${port}!`));
};

const init = () => {
  if (process.env.NODE_ENV === 'development') {
    watchers.set();
  }

  initServer();
};

init();
