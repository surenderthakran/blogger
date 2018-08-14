'use strict';

const fs = require('fs');
const glob = require('glob');
const mustache = require('mustache');
const path = require('path');

const articleStore = require(__root + '/datastore/articlestore');
const projectStore = require(__root + '/datastore/projectstore');

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
  const files = glob.sync(__root + '/views/templates/partials/*.html', options);

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
    if(file.indexOf(".html") > -1) {
      console.log('Deleting file:', file);
      const filePath = path.join(__root + '/public/', file);
      fs.unlinkSync(filePath);
    }
  });
};

const renderPages = () => {
  console.log('\nRendering pages...');
  rendererConfig.pages.forEach((page) => {
    console.log('Rendering page:', page.src);
    const file = fs.readFileSync(__root + '/views/templates/' + page.src, 'utf8');
    const output = mustache.render(file, page.viewData, rendererConfig.partials);
    fs.writeFileSync(__root + '/public/' + page.target, output);
  });
};

externals.render = () => {
  registerPartials();

  removePages();
  renderPages();
};

module.exports = externals;
