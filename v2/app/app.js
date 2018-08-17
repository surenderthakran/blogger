'use strict';

global.__root = __dirname;

// Global requires.
const path = require('path');

// NPM requires.
const express = require('express');

// Local requires.
const watchers = require(__root + '/watchers');

const publicPath = path.join(__root, '/public/');

const initServer = () => {
  const app = express();

  app.use(express.static(publicPath));

  app.get('/projects', (req, res) => {
    res.sendFile(path.join(publicPath, '/projects.html'));
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(publicPath, '/about.html'));
  });

  app.use((req, res, next) => {
    res.status(404).sendFile(path.join(publicPath, '/404.html'));
  });

  app.listen(
      18660, () => console.log('\nExample app listening on port 18660!'));
};

const init = () => {
  if (process.env.NODE_ENV === 'development') {
    watchers.set();
  }

  initServer();
};

init();
