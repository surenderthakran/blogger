'use strict';

const Mustache = require('mustache');

const ArticleStore = require('../../articlestore');

exports.register = function (server, options, next) {
  const partials = {};

  server.views({
    engines: {
      html: {
        compile: function (template) {
          Mustache.parse(template);

          return function (context) {
            return Mustache.render(template, context, partials);
          };
        },
        registerPartial: function (name, src) {
          console.log('inside registerPartial()');
          partials[name] = src;
        },
      },
    },
    relativeTo: __dirname,
    path: '../../views',
    partialsPath: '../../views/partials',
  });

  // @TODO: make urls case insensitive

  server.route({ method: 'GET', path: '/', handler: function (request, reply) {
    console.log('GET /');
    reply.view('index', {
      head: {
        title: 'Home | Surender Thakran',
        description: 'Surender Thakran\'s technical articles about web development, server management and enterprise architecture',
        keywords: 'web,css3,html5',
      },
      articles: ArticleStore,
    });
  } });

  server.route({ method: 'GET', path: '/about', handler: function (request, reply) {
    console.log('GET /about');
    reply.view('about', {
      head: {
        title: 'About | Surender Thakran',
        description: 'Page describing Surender Thakran, his career path and future goals.',
        keywords: 'web architect,enterprise architect,startup,devops,backend developer,frontend developer,technology',
      },
    });
  } });

  server.route({ method: 'GET', path: '/articles/tech/{articleId}', handler: function (request, reply) {
    console.log('GET ' + request.path);

    var path = request.path;
    path = path.substring(1);

    var articleId = request.params.articleId;
    console.log(articleId);

    var index = -1;
    for (var i = 0, len = ArticleStore.length; i < len; i++) {
      if (ArticleStore[i].articleId === articleId) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      var articleData = ArticleStore[index];
      console.log(articleData);

      reply.view(path + '/index.html', articleData);
    } else {
      reply.view('404', {                 // @TODO: update 404 page
        head: {
          title: 'Page Not Found | Surender Thakran',
          description: 'The requested page does not exists',
          keywords: '404',
        },
      });
    }
  }});

  // @TODO: update to redirect all *.html requests to non-html urls
  server.route({
    method: 'GET',
    path: '/{filename*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html'],
      },
    },
  });

  next();
};

exports.register.attributes = {
  name: 'staticRoutesPlugin',
  version: '1.0.0',
  multiple: false,
};
