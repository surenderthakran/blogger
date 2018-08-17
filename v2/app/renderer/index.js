'use strict';

const fs = require('fs');
const glob = require('glob');
const mustache = require('mustache');
const path = require('path');

const rendererConfig = require(__root + '/renderer/config');

const templatesPath = __root + '/views/templates/';
const partialsPath = __root + '/views/templates/partials/';

const externals = {};

const registerPartials = () => {
  console.log('Registering partials...');
  let options = {
    nodir: true,
    strict: true,
    cwd: process.cwd(),
  };
  const files = glob.sync(partialsPath + '*.html', options);

  files.forEach((filePath) => {
    let fileName = path.basename(filePath);
    let partialName = fileName.substring(0, fileName.indexOf('.'));

    rendererConfig.partials[partialName] = fs.readFileSync(filePath, 'utf8');
  });
};

const removePages = () => {
  console.log('Deleting existing pages...');
  const files = fs.readdirSync(__root + '/public/');

  files.forEach((file) => {
    if (file.indexOf('.html') > -1) {
      const filePath = path.join(__root + '/public/', file);
      fs.unlinkSync(filePath);
    }
  });
};

const renderPages = () => {
  console.log('Rendering pages...');
  rendererConfig.pages.forEach((page) => {
    const file = fs.readFileSync(templatesPath + page.src, 'utf8');
    const output = mustache.render(file, page.viewData, rendererConfig.partials);
    fs.writeFileSync(__root + '/public/' + page.target, output);
  });
};

externals.render = () => {
  console.log('\nRunning Renderer...');
  registerPartials();

  removePages();
  renderPages();
};

module.exports = externals;
