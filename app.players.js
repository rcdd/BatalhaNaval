/* jshint node: true */
'use strict';
const util = require('util');
const mongodb = require('mongodb');
const sha1 = require('sha1');
const database = require('./app.database');
const security = require('./app.security');


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
    console.log("update player");
    const patt = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    const id = new mongodb.ObjectID(request.params.id);
    const player = request.body;

    if (player.username === '') {
        response.send(400, "Error: Username Vazio a sério!!");
        return next();
    }


    if (player.photo === '') {
        player.photo = 'http://img.faceyourmanga.com/mangatars/0/2/2797/large_3810.png';
    }

    if (player.passwordHash < 3) {
        response.send(400, "Error: Password não tem caracteres suficientes minimo 3");
        return next();
    }

    player.passwordHash = sha1(player.passwordHash + security.salt);
    player.passwordHashConfirmation = sha1(player.passwordHashConfirmation + security.salt);

    if (player.passwordHash !== player.passwordHashConfirmation) {
        response.send(400, "Error: As password não são iguais");
        return next();
    }
    delete player.passwordHashConfirmation;

    if (!patt.test(player.email)) {
        response.send(400, "Error: email Inválido");
        return next();
    }

    if (player === undefined) {
        response.send(400, 'No player data');
        return next();
    }
    delete player._id;

    database.db.collection('players').find({
        "$or": [{
            "username": player.username
        }, {
            "email": player.email
        }]
    })
        .toArray(function (err, players) {
            if (err) {
                console.log(err);
            }
            console.log(players);
            if (players.length <= 1) {
                database.db.collection('players')
                    .updateOne({
                        _id: id
                    }, {
                        $set: player
                    })
                    .then(returnPlayer(id, response, next))
                    .catch(err => handleError(err, response, next));
            } else {
                response.send(400, "Error: email ou username já existentes!");
                return next();
            }
        });
}

function createPlayer(request, response, next) {
    const patt = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    let player = request.body;
    player.photo = 'http://img.faceyourmanga.com/mangatars/0/2/2797/large_3810.png';

    if (player.username === '') {
        response.send(400, "Error: Username Vazio a sério!!");
        return next();
    }

    if (player.passwordHash < 3) {
        response.send(400, "Error: Password não tem caracteres suficientes minimo 3");
        return next();
    }

    player.passwordHash = sha1(player.passwordHash);
    player.passwordHashConfirmation = sha1(player.passwordHashConfirmation);

    if (player.passwordHash !== player.passwordHashConfirmation) {
        response.send(400, "Error: As password não são iguais");
        return next();
    }
    delete player.passwordHashConfirmation;

    if (!patt.test(player.email)) {
        response.send(400, "Error: email Inválido");
        return next();
    }


    if (player === undefined) {
        response.send(400, 'No player data');
        return next();
    }

    database.db.collection('players').find({
        "$or": [{
            "username": player.username
        }, {
            "email": player.email
        }]
    })
        .toArray(function (err, players) {
            if (err) {
                console.log(err);
            }
            console.log(players);
            if (players.length < 1) {
                database.db.collection('players')
                    .insertOne(player)
                    .then(result => returnPlayer(result.insertedId, response, next))
                    .catch(err => handleError(err, response, next));
            } else {
                response.send(400, "Error: email ou username já existentes!");
                return next();
            }
        });
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
        .sort({ totalVictories: -1 })
        .limit(10)
        .toArray()
        .then(players => {
            response.json(players || []);
            // TODO: notify all players that the top 10 was accessed
            // Use: settings.websocket.notifyAll
            //settings.websocket.notifyAll('players', Date.now() + " Somebody accessed top 10");
            next();
        })
        .catch(err => handleError(err, response, next));
}

// Routes for the players
players.init = function (server, options) {
    settings = options;
    server.get(settings.prefix + 'top10', getTop10);
    server.get(settings.prefix + 'players', settings.security.authorize, getPlayers);
    server.get(settings.prefix + 'players/:id', settings.security.authorize, getPlayer);
    server.put(settings.prefix + 'players/:id', settings.security.authorizeBearer, updatePlayer);
    server.post(settings.prefix + 'players', createPlayer);
    server.del(settings.prefix + 'players/:id', settings.security.authorize, deletePlayer);
    console.log("Players routes registered");
};
