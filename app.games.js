/* jshint node: true */
'use strict';
const mongodb = require('mongodb');
const database = require('./app.database');
const util = require('util');

const games = module.exports = {};
let settings = {};

function handleError(err, response, next) {
    response.send(500, err);
    next();
}

function returnGame(id, response, next) {
    database.db.collection('games')
        .findOne({
            _id: id
        })
        .then(game => {
            if (game === null) {
                response.send(404, 'Game not found');
            } else {
                response.json(game);
            }
            next();
        })
        .catch(err => handleError(err, response, next));
}

function getGames(request, response, next) {
    database.db.collection('games')
        .find()
        .toArray()
        .then(games => {
            response.json(games || []);
            next();
        })
        .catch(err => handleError(err, response, next));

}

/*
function getGamesWaiting(request, response, next) {
	database.db.collection('games')
        .find({state: 'waiting'})
		.toArray()
		.then(games => {
			response.json(games || []);
			next();
		})
        .catch(err => handleError(err, response, next));

}
*/

function getGame(request, response, next) {
    const id = new mongodb.ObjectID(request.params.id);
    returnGame(id, response, next);
}

function getGameByid(id) {
    console.log("getgamebyid");
    let request = {};
    let next = {};
    returnGame(id, response, next);
}

function updateGame(request, response, next) {
    const id = new mongodb.ObjectID(request.params.id);
    const game = request.body;

    if (game === undefined) {
        response.send(400, 'No game data');
        return next();
    }
    delete game._id;
    database.db.collection('games')
        .updateOne({
            _id: id
        }, {
            $set: game
        })
        .then(returnGame(id, response, next))
        .catch(err => handleError(err, response, next));
}

function createGame(request, response, next) {
    console.log(request);
    var game = request.body;
    if (game === undefined) {
        response.send(400, 'No game data');
        return next();
    }
    console.log(game);
    database.db.collection('games')
        .insertOne(game)
        .then(result => returnGame(result.insertedId, response, next))
        .catch(err => handleError(err, response, next));
}

function deleteGame(request, response, next) {
    const id = new mongodb.ObjectID(request.params.id);
    database.db.collection('games')
        .deleteOne({
            _id: id
        })
        .then(result => {
            if (result.deletedCount === 1) {
                response.json({
                    msg: util.format('Game -%s- Deleted', id)
                });
            } else {
                response.send(404, 'No game found');
            }
            next();
        })
        .catch(err => handleError(err, response, next));
}

// Routes for the games
games.init = (server, options) => {
    settings = options;
    // server.get(settings.prefix + 'games/waiting', settings.security.authorize, getGamesWaiting);
    server.get(settings.prefix + 'games', settings.security.authorizeBearer, getGames);
    server.get(settings.prefix + 'games/:id', settings.security.authorizeBearer, getGame);
    server.put(settings.prefix + 'games/:id', settings.security.authorizeBearer, updateGame);
    server.post(settings.prefix + 'games', settings.security.authorizeBearer, createGame);
    server.del(settings.prefix + 'games/:id', settings.security.authorizeBearer, deleteGame);
    console.log("Games routes registered");
};

games.getGames = returnGame;
