'use strict';

// Global requires.
const fs = require('fs');
const path = require('path');

// NPM requires.
const glob = require('glob');
const mustache = require('mustache');

// Local requires.
const rendererConfig = require(__root + '/renderer/config');

const templatesPath = path.join(__root, '/views/templates/');
const partialsPath = path.join(__root, '/views/templates/partials/');
const publicPath = path.join(__root, '/public/');

const externals = {};

const registerPartials = () => {
  console.log('Registering partials...');
  let options = {
    nodir: true,
    strict: true,
    cwd: process.cwd(),
  };
  const files = glob.sync(path.join(partialsPath, '*.html'), options);

  files.forEach((filePath) => {
    let partialName = path.basename(filePath, '.html');

    rendererConfig.partials[partialName] = fs.readFileSync(filePath, 'utf8');
  });
};

const deleteAllHtmlPages = (directory=publicPath) => {
  console.log('Deleting html files in', directory);
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    if (fs.lstatSync(path.join(directory, file)).isDirectory()) {
      deleteAllHtmlPages(path.join(directory, file));
    } else if (path.extname(file) === '.html') {
      const filePath = path.join(directory, file);
      console.log('Deleting', filePath);
      fs.unlinkSync(filePath);
    }
  });
};

const renderPages = () => {
  console.log('Rendering pages...');
  rendererConfig.pages.forEach((page) => {
    const file = fs.readFileSync(path.join(templatesPath, page.src), 'utf8');

    const output = mustache.render(
      file, page.viewData, rendererConfig.partials);

    fs.writeFileSync(path.join(publicPath, page.target), output);
  });
};

externals.render = () => {
  console.log('\nRunning Renderer...');

  registerPartials();
  deleteAllHtmlPages();
  renderPages();
};

module.exports = externals;
