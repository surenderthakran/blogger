'use strict';

// Global requires.
const {promisify} = require('util');

// NPM requires.
const chokidar = require('chokidar');

// Local requires.
const renderer = require(__root + '/renderer');

const sleep = promisify(setTimeout);

const externals = {};

externals.set = () => {
  console.log('Setting watchers...');
  const rendererWatcher = chokidar.watch(
      [__root + '/renderer', __root + '/views/templates'],
      {
        ignoreInitial: true,
        persistent: true,
      });

  const renderHtml = async (path) => {
    console.log('delaying html render...');
    await sleep(800);
    renderer.render();
  };

  rendererWatcher
  .on('add', renderHtml)
  .on('change', renderHtml)
  .on('unlink', renderHtml);
};

module.exports = externals;
