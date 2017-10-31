'use strict';

const Fs = require('fs');
const Mustache = require('mustache');
const Path = require('path');

const ArticleStore = require('../../../articlestore');

module.exports = function (request, reply) {
  console.log(request.method.toUpperCase() + ' ' + request.path);

  let articleId = request.params.articleId;

  let index = -1;
  for (let i = 0, len = ArticleStore.length; i < len; i++) {
    if (ArticleStore[i].articleId === articleId) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    let articleData = ArticleStore[index];
    let articleBody = Fs.readFileSync(Path.join(request.server.app.viewsPath,
        Path.join(articleData.url, 'index.html')), 'utf8');
    // prerendered to render urls in article before adding to article template
    articleData.article.body = Mustache.render(articleBody, articleData);
    reply.view('article', articleData);
  } else {
    reply.view('404', {
      head: {
        title: 'Page Not Found | Surender Thakran',
        description: 'The requested page does not exists',
        keywords: '404',
      },
    });
  }
};
