'use strict';

const Hapi = require("hapi");
const Inert = require("inert");
const Path = require("path");
const Vision = require('vision');
const Mustache = require("mustache");

const ArticleStore = require("./articlestore");

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, "views")
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
            path: "views",
            partialsPath: "views/partials"
        });

        server.route({ method: "GET", path: "/", handler: function (request, reply) {
            console.log("GET /");
            reply.view("index", {
                head: {
                    title: "Home | Surender Thakran",
                    description: "Surender Thakran's technical articles about web development, server management and enterprise architecture",
                    keywords: "web,css3,html5"
                },
                articles: ArticleStore
            });
        } });

        server.route({ method: "GET", path: "/about", handler: function (request, reply) {
            console.log("GET /about");
            reply.view("about", {
                head: {
                    title: "About | Surender Thakran",
                    description: "Page describing Surender Thakran, his career path and future goals.",
                    keywords: "web architect,enterprise architect,startup,devops,backend developer,frontend developer,technology"
                }
            });
        } });

        server.route({ method: "GET", path: "/articles/tech/{article_id*}", handler: function (request, reply) {
            console.log("GET " + request.path);
            console.log(request.params.article_id);

            var path = request.path;
            path = path.substring(1);

            var article_id = request.params.article_id;
            console.log(article_id);

            var index = -1;
            for (var i = 0, len = ArticleStore.length; i < len; i++) {
                if (ArticleStore[i]["article_id"] === article_id) {
                    index = i;
                    break;
                }
            }

            if (index !== -1) {
                var article_data = ArticleStore[index];
                console.log(article_data);

                reply.view(path, article_data.template_data);
            } else {
                reply.view("404", {                 // @TODO: update 404 page
                    head: {
                        title: "Page Not Found | Surender Thakran",
                        description: "The requested page does not exists",
                        keywords: "404"
                    }
                });
            }
        }});

        // @TODO: update to redirect all *.html requests to non-html urls
        server.route({
            method: "GET",
            path: "/{filename*}",
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

            console.log("Server running at: " + server.info.uri);
        });
    }
});

// @TODO: in error handling block of a request, use request.getLog() to print request's logs for debugging
// @TODO: create loggin plugin based on 'good' which we implicitly handle multiple good plugins registration and configuration. Use https://github.com/hapijs/good/blob/master/API.md for reference.
