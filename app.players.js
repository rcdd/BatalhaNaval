const util = require('util');
const mongodb = require('mongodb');
const sha1 = require('sha1');
const database = require('./app.database');

const players = module.exports = {};
let settings = {};

function handleError(err, response, next) {
	response.send(500, err);
	next();
}

function returnPlayer(id, response, next) {
    database.db.collection('players')
        .findOne({
            _id: id
        })
        .then((player) => {
            if (player === null) {
                response.send(404, 'Player not found');
            } else {
                response.json(player);
            }
            next();
        })
        .catch(err => handleError(err, response, next));
}

function getPlayers(request, response, next) {
    database.db.collection('players')
        .find()
        .toArray()
        .then(players => {
            response.json(players || []);
            next();
        })
        .catch(err => handleError(err, response, next));
}

function getPlayer(request, response, next) {
    const id = new mongodb.ObjectID(request.params.id);
    returnPlayer(id, response, next);
}

function updatePlayer(request, response, next) {
    const id = new mongodb.ObjectID(request.params.id);
    const player = request.body;

    if (player === undefined) {
        response.send(400, 'No player data');
        return next();
    }
    delete player._id;
    database.db.collection('players')
        .updateOne({
            _id: id
        }, {
            $set: player
        })
        .then(result => returnPlayer(id, response, next))
        .catch(err => handleError(err, response, next));
}

function createPlayer(request, response, next) {
    const player = request.body;
    player.passwordHash = sha1(player.passwordHash);
    if (player === undefined) {
        response.send(400, 'No player data');
        return next();
    }
    database.db.collection('players')
        .insertOne(player)
        .then(result => returnPlayer(result.insertedId, response, next))
        .catch(err => handleError(err, response, next));
}

function deletePlayer(request, response, next) {
    var id = new mongodb.ObjectID(request.params.id);
    database.db.collection('players')
        .deleteOne({
            _id: id
        })
        .then(result => {
            if (result.deletedCount === 1) {
                response.json({
                    msg: util.format('Player -%s- Deleted', id)
                });
            } else {
                response.send(404, 'No player found');
            }
            next();
        })
        .catch(err => handleError(err, response, next));
}

function getTop10(request, response, next) {
    database.db.collection('players')
        .find()
        .sort({totalVictories:-1})
        .limit(10)
        .toArray()
        .then(players => {
            response.json(players || []);
            // TODO: notify all players that the top 10 was accessed
            // Use: settings.websocket.notifyAll
             settings.websocket.notifyAll('players', Date.now() + " Somebody accessed top 10");
            next();
        })
        .catch(err => handleError(err, response, next));
}

// Routes for the players
players.init = function(server, options) {
    settings = options;
    server.get(settings.prefix + 'top10', getTop10);
    server.get(settings.prefix + 'players', settings.security.authorize, getPlayers);
    server.get(settings.prefix + 'players/:id', settings.security.authorize, getPlayer);
    server.put(settings.prefix + 'players/:id', settings.security.authorize, updatePlayer);
    server.post(settings.prefix + 'players', createPlayer);
    server.del(settings.prefix + 'players/:id', settings.security.authorize, deletePlayer);
    console.log("Players routes registered");
};
