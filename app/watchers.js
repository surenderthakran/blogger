'use strict';

// Global requires.
const path = require('path');
const {promisify} = require('util');

// NPM requires.
const chokidar = require('chokidar');
const webpack = require('webpack');

// Local requires.
const renderer = require(__root + '/renderer');
const webpackConfig = require(path.join(__root, '../webpack.config'));

const sleep = promisify(setTimeout);

const externals = {};

const watchRenderer = () => {
  console.log('Setting renderer watcher...');
  const renderHtml = async (path) => {
    await sleep(800);
    renderer();
  };
  renderHtml();

  const rendererWatcher = chokidar.watch(
      [path.join(__root, '/views/templates/**/*')],
      {
        ignoreInitial: true,
        persistent: true,
      });

  rendererWatcher
  .on('add', renderHtml)
  .on('change', renderHtml)
  .on('unlink', renderHtml);
};

const watchWebpack = () => {
  console.log('Setting webpack watcher...');

  const compiler = webpack(webpackConfig);

  compiler.watch({
    aggregateTimeout: 500,
    poll: undefined,
  }, (err, stats) => {
    console.log('\n=============== Webpack report! ===============');
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    console.log(stats.toString({
      builtAt: false,
      chunks: false,
      colors: true,
      hash: false,
      stats: 'minimal',
      version: false,
    }));
    console.log('===============================================');
  });
};

externals.set = () => {
  console.log('Setting watchers...');

  watchRenderer();

  watchWebpack();
};

module.exports = externals;
