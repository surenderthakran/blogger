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

const removePages = () => {
  console.log('Deleting existing pages...');
  const files = fs.readdirSync(publicPath);

  files.forEach((file) => {
    if (path.extname(file) === '.html') {
      const filePath = path.join(publicPath, file);
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
  removePages();
  renderPages();
};

module.exports = externals;
