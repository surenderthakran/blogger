'use strict';

const fs = require('fs');
const mustache = require('mustache');
const articleStore = require(__root + '/config/articlestore');

const externals = {};

externals.render = () => {
  const index = fs.readFileSync(__root + '/views/index.html', 'utf8');
  const html = mustache.render(index, {
    head: {
      title: 'Home | Surender Thakran',
      description: 'Surender Thakran\'s technical articles about web development, server management and enterprise architecture',
      keywords: 'web,css3,html5',
    },
    articles: articleStore,
  }, {
    head_content: fs.readFileSync(__root + '/views/partials/head_content.html', 'utf8'),
    header: fs.readFileSync(__root + '/views/partials/header.html', 'utf8')
  });

  fs.writeFile(__root + '/public/index.html', html, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
};

module.exports = externals;
