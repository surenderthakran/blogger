'use strict';

const Hapi = require("hapi");
const Inert = require("inert");
const Good = require("good");
const GoodConsole = require("good-console");

const server = new Hapi.Server();
server.connection({
    host: "0.0.0.0",                        // @TODO: decide between "localhost" and "0.0.0.0" for docker containers
    port: 3000
});

server.register(Inert, (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file(__dirname + '/views/about.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/{filename*}',
        handler: {
            directory: {
                path: __dirname + "/views"
            }
        }
    });
});


var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: GoodConsole,
        events: { log: '*', response: '*' }
    }]
};

server.register({
    register: Good,
    options: options
}, function (err) {
    if (err) {
        console.error(err);
    } else {
        server.start(() => {
            console.log('Server running at:', server.info.uri);
        });
    }
});
