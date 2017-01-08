/* jshint node: true */
'use strict';
// const path = require('path');
const restify = require('restify');
// const passport = require('passport');
const database = require('./app.database');
const websocket = require('./app.websockets');

const url = 'mongodb://localhost:27017/battleship';
const server = restify.createServer();



restify.CORS.ALLOW_HEADERS.push('authorization');
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);


const security = require('./app.security');

security.initMiddleware(server);

const options = {websocket, security, prefix: '/api/v1/'};

// URL base Rest Api endpoints = /api/v1
const auth = require('./app.authentication');
auth.init(server, options);

const players = require('./app.players');
players.init(server, options);

const games = require('./app.games');
games.init(server, options);

server.get(/^\/(?!api\/).*/, restify.serveStatic({
	directory: './angular',
	default: 'index.html',
	maxAge: -1
}));

database.connect(url, () => {
	server.listen(8080, () => console.log('%s listening em %s', server.name, server.url));
    // Websocket is initialized after the server
    // console.log(server.server);
	websocket.init(server.server);
});
