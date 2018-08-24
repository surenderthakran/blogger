'use strict';

// Global requires.
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'public/js/main.min': path.join(__root, 'views/js/main.js'),
  },
  output: {
    path: __root,
    filename: '[name].js',
  },
  devtool: 'source-map',
};
