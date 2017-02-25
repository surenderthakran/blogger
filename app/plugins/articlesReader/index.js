'use strict';

const Fs = require('fs');
const Mustache = require('mustache');
const Path = require('path');

const ArticleStore = require('../../articlestore');

exports.register = function(server, options, next) {
  try {
    for (let i = 0, len = ArticleStore.length; i < len; i++) {
      let articleBody = Fs.readFileSync(Path.join(server.app.viewsPath,
          Path.join(ArticleStore[i].url, 'index.html')), 'utf8');
      ArticleStore[i].article.body = Mustache.render(articleBody,
          ArticleStore[i]);
    }

    server.app.articleStore = ArticleStore;
    next();
  } catch(e) {
    console.error(e.stack);
  }
};

exports.register.attributes = {
  name: 'articlesReaderPlugin',
  version: '1.0.0',
  multiple: false,
};
