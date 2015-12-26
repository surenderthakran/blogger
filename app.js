'use strict';

var express = require("express");

var app = express();

app.use(express.static('views'));

app.get('/', function (req, res) {
  res.redirect('/about.html');
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at port: %s", port);
});
