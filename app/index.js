'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');

const StaticRoutesPlugin = require('./plugins/staticRoutes');

const server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'views/dist'),
      },
    },
  },
});

server.connection({
  host: '0.0.0.0',                        // @TODO(surenderthakran): decide between 'localhost' and '0.0.0.0' for docker containers
  port: 18660,
  labels: ['webserver'],
});

server.app.viewsPath = __dirname + '/views';

server.register([
  Inert,
  Vision,
  {
    register: StaticRoutesPlugin,
  },
], (err) => {
  if (err) {
    console.error(err);
  } else {
    server.start((err) => {
      if (err) {
        throw err;
      }

      console.log('Server running at: ' + server.info.uri);
    });
  }
});

// @TODO(surenderthakran): in error handling block of a request, use request.getLog() to print request's logs for debugging
// @TODO(surenderthakran): create logging plugin based on 'good' which we implicitly handle multiple good plugins registration and configuration. Use https://github.com/hapijs/good/blob/master/API.md for reference.
