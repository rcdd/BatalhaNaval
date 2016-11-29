const mongodb = require('mongodb');
const database = require('./app.database');
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

function getGame(request, response, next) {
	const id = new mongodb.ObjectID(request.params.id);
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
        .then(result => returnGame(id, response, next))
        .catch(err => handleError(err, response, next));
}

function createGame(request, response, next) {
	var game = request.body;
	if (game === undefined) {
        response.send(400, 'No game data');
        return next();
    }
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
    server.get(settings.prefix + 'games', settings.security.authorize, getGames);
    server.get(settings.prefix + 'games/:id', settings.security.authorize, getGame);
    server.put(settings.prefix + 'games/:id', settings.security.authorize, updateGame);
    server.post(settings.prefix + 'games', settings.security.authorize, createGame);
    server.del(settings.prefix + 'games/:id', settings.security.authorize, deleteGame);
    console.log("Games routes registered");
};
