'use strict';

// Global requires.
const path = require('path');
const {promisify} = require('util');

// NPM requires.
const chokidar = require('chokidar');
const webpack = require('webpack');

// Local requires.
const renderer = require(__root + '/renderer');

const sleep = promisify(setTimeout);

const externals = {};

const watchRenderer = () => {
  console.log('Setting renderer watcher...');
  const renderHtml = async (path) => {
    await sleep(800);
    renderer.render();
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

  const compiler = webpack({
    mode: 'production',
    entry: path.join(__root, 'views/js/main.js'),
    output: {
      path: path.join(__root, 'public/js'),
      filename: 'main.min.js',
    },
    devtool: 'source-map',
  });

  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined,
  }, (err, stats) => {
    console.log('\nWebpack report!');
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString({
      builtAt: false,
      chunks: false,
      colors: true,
      hash: false,
      stats: 'minimal',
      version: false,
    }));
  });
};

externals.set = () => {
  console.log('Setting watchers...');

  watchRenderer();

  watchWebpack();
};

module.exports = externals;
