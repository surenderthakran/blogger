'use strict';

const Hapi = require("hapi");
const Inert = require("inert");
const Path = require("path");
const Vision = require('vision');
const Mustache = require("mustache");

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'views')
            }
        }
    }
});

server.connection({
    host: "0.0.0.0",                        // @TODO: decide between "localhost" and "0.0.0.0" for docker containers
    port: 18660,
    labels: ["webserver"]
});

const staticRoutesPlugin = {
    register: function (server, options, next) {

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
                        console.log("inside registerPartial()");
                        partials[name] = src;
                    }
                }
            },
            relativeTo: __dirname,
            path: 'views',
            partialsPath: 'views/partials'
        });

        server.route({ method: 'GET', path: '/', handler: function (request, reply) {
            console.log("GET /");
            reply.view('index', {
                head: {
                    title: "Home | Surender Thakran",
                    description: "Surender Thakran's technical articles about web development, server management and enterprise architecture",
                    keywords: "web,css3,html5"
                }
            });
        } });

        server.route({ method: 'GET', path: '/article', handler: function (request, reply) {
            console.log("GET /article");
            reply.view('article', {
                head: {
                    title: "Article | Surender Thakran",
                    description: "Surender Thakran's technical articles about web development, server management and enterprise architecture",
                    keywords: "web,css3,html5"
                }
            });
        } });

        server.route({
            method: 'GET',
            path: '/{filename*}',
            handler: {
                directory: {
                    path: ".",
                    index: ["index.html"]
                }
            }
        });

        next();
    }
};

staticRoutesPlugin.register.attributes = {
    name: "staticRoutesPlugin",
    version: "1.0.0",
    multiple: false
};

server.register([
    Inert,
    Vision,
    {
        register: staticRoutesPlugin
    }
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

// @TODO: in error handling block of a request, use request.getLog() to print request's logs for debugging
// @TODO: create loggin plugin based on 'good' which we implicitly handle multiple good plugins registration and configuration. Use https://github.com/hapijs/good/blob/master/API.md for reference.
