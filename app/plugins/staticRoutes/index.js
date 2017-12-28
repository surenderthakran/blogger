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
          console.log('Registering partial: ' + name);
          partials[name] = src;
        },
      },
    },
    relativeTo: __dirname,
    path: '../../views',
    partialsPath: '../../views/partials',
  });

  // @TODO(surenderthakran): make urls case insensitive

  server.route({ method: 'GET', path: '/', handler: function (request, reply) {
    console.log(request.method.toUpperCase() + ' ' + request.path);
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
    console.log(request.method.toUpperCase() + ' ' + request.path);
    reply.view('about', {
      head: {
        title: 'About | Surender Thakran',
        description: 'Page describing Surender Thakran, his career path and future goals.',
        keywords: 'web architect,enterprise architect,startup,devops,backend developer,frontend developer,technology',
      },
    });
  } });

  server.route({ method: 'GET', path: '/articles/tech/{articleId}', handler: require('./handlers/article')});

  // @TODO(surenderthakran): update to redirect all *.html requests to non-html urls
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

  server.ext('onPostHandler', function (request, reply) {
    let response = request.response;
    if (response.output && response.output.statusCode &&
        response.output.statusCode === 404) {
      return reply.view('404', {
        head: {
          title: 'Page Not Found | Surender Thakran',
          description: 'The requested page does not exists',
          keywords: '404',
        },
      });
    }
    return reply.continue();
  });

  next();
};

exports.register.attributes = {
  name: 'staticRoutesPlugin',
  version: '1.0.0',
  multiple: false,
};
