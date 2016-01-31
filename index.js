'use strict';

const Hapi = require("hapi");
const Inert = require("inert");
const Good = require("good");
const GoodConsole = require("good-console");
const GoodFile = require("good-file");
const Path = require("path");

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
    labels: ["static"]
});

var good_options = {
    opsInterval: 1000,
    reporters: [{
        reporter: GoodConsole,
        events: { log: '*', request: '*', response: '*' },              // @TODO: fix GoodConsole not logging request events
        config: {
            format: "DDMMYY/HHmmss.SSS"
        }
    }, {
        reporter: GoodFile,
        events: { log: '*', request: '*', response: '*', wreck: '*' },
        config: {
            path: './log/',
            prefix: 'requests',
            format: 'DD-MM-YYYY',
            extension: '.log'
        }
    }]
};

server.register([
    Inert,
    {
        register: Good,
        options: good_options
    }
], (err) => {
    if (err) {
        console.error(err);
    } else {

        server.route({
            method: 'GET',
            path: '/{filename*}',
            handler: {
                directory: {
                    path: ".",
                    index: ["index.html", "about.html"]
                }
            }
        });

        server.start(() => {
            server.log(["server"], 'Server running at:' + server.info.uri);
        });
    }
});

// @TODO: in error handling block of a request, use request.getLog() to print request's logs for debugging
// @TODO: create loggin plugin based on 'good' which we implicitly handle multiple good plugins registration and configuration. Use https://github.com/hapijs/good/blob/master/API.md for reference.
