'use strict';

const Hapi = require("hapi");
const Inert = require("inert");

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(Inert, (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            console.log("1");
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

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
