'use strict';

// Global requires.
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'app/public/js/main.min': path.join(__dirname, 'app/views/js/main.js'),
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  devtool: 'source-map',
};
