'use strict';

const ArticleStore = require('../../../articlestore');

module.exports = function (request, reply) {
  reply.view('index', {
    head: {
      title: 'Home | Surender Thakran',
      description: 'Surender Thakran\'s technical articles about web development, server management and enterprise architecture',
      keywords: 'web,css3,html5',
    },
    articles: ArticleStore,
  });
};
