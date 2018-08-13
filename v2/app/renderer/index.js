'use strict';

const fs = require('fs');
const glob = require('glob');
const mustache = require('mustache');
const path = require('path');

const articleStore = require(__root + '/config/articlestore');

const rendererConfig = {
  partials: {}
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
    console.log(filePath);
    let fileName = path.basename(filePath);
    let partialName = fileName.substring(0, fileName.indexOf('.'));

    rendererConfig.partials[partialName] = fs.readFileSync(filePath, 'utf8');
  });
};

externals.render = () => {
  registerPartials();
  const index = fs.readFileSync(__root + '/views/templates/index.html', 'utf8');
  const html = mustache.render(index, {
    head: {
      title: 'Home | Surender Thakran',
      description: 'Surender Thakran\'s technical articles about web development, server management and enterprise architecture',
      keywords: 'web,css3,html5',
    },
    articles: articleStore,
  }, rendererConfig.partials);

  fs.writeFile(__root + '/public/index.html', html, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
};

module.exports = externals;
