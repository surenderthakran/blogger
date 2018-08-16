'use strict';

const fs = require('fs');
const glob = require('glob');
const mustache = require('mustache');
const path = require('path');

const articleStore = require(__root + '/datastore/articlestore');
const projectStore = require(__root + '/datastore/projectstore');

const templatesPath = __root + '/views/templates/';
const partialsPath = __root + '/views/templates/partials/';

const rendererConfig = {
  partials: {},
  pages: [
    {
      src: 'index.html',
      target: 'index.html',
      viewData: {
        head: {
          title: 'Home | Surender Thakran',
          description: 'Surender Thakran\'s technical articles about web development, server management and enterprise architecture',
          keywords: 'web,css3,html5',
        },
        articles: articleStore,
      },
    },
  ],
};

const externals = {};

const registerPartials = () => {
  let options = {
    nodir: true,
    strict: true,
    cwd: process.cwd(),
  };
  const files = glob.sync(partialsPath + '*.html', options);

  files.forEach((filePath) => {
    console.log('Registering partial:', filePath);
    let fileName = path.basename(filePath);
    let partialName = fileName.substring(0, fileName.indexOf('.'));

    rendererConfig.partials[partialName] = fs.readFileSync(filePath, 'utf8');
  });
};

const removePages = () => {
  console.log('\nDeleting pages...');
  const files = fs.readdirSync(__root + '/public/');

  files.forEach((file) => {
    if (file.indexOf('.html') > -1) {
      console.log('Deleting file:', file);
      const filePath = path.join(__root + '/public/', file);
      fs.unlinkSync(filePath);
    }
  });
};

const renderPages = () => {
  console.log('\nRendering pages...');
  rendererConfig.pages.forEach((page) => {
    console.log('Rendering page:', templatesPath + page.src);
    const file = fs.readFileSync(templatesPath + page.src, 'utf8');
    const output = mustache.render(file, page.viewData, rendererConfig.partials);
    fs.writeFileSync(__root + '/public/' + page.target, output);
  });
};

externals.render = () => {
  console.log('Running Renderer...');
  registerPartials();

  removePages();
  renderPages();
};

module.exports = externals;
