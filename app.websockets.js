/* jshint node: true */
'use strict';
const io = require('socket.io');
const mongodb = require('mongodb');
const database = require('./app.database');

const ws = module.exports = {};
let wsServer = null;

var allDataServer = [];

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        client.emit('players', ' Welcome to battleship');
        client.broadcast.emit('players', 'A new player has arrived');

        client.on('chat', data => {
            client.broadcast.emit('chat', data);
        });

        client.on('lists', data => {
            console.log('appSocket: Alert List Received ');
            client.broadcast.emit('lists');
        });

        client.on('startGame', data => {
            console.log('appSocket: createGame ');
            //console.dir(data);

            // SERA QUE DEVEMOS GUARDAR OS DADOS NO WEBSOCKET OU NO BASE DE DADOS???
            allDataServer.push({ channel: data.channel, data: data.boards });

            console.log('appSocket: AllDataServer ');
            console.dir(allDataServer);

            client.on(data.channel, allData => {
                console.log('client on channel');
                // console.dir(allData);
                allDataServer.forEach(function (gameServer) {
                    console.log("foreach");
                    // console.dir(gameServer.channel);
                    console.log("foreach data.channel");
                    // console.dir(data.channel);
                    if (gameServer.channel === data.channel) {
                        console.log('é este game');
                        let boards = [];
                        let game = [];
                        gameServer.data.forEach(function (gameBoard) {
                            if (gameBoard.owner === allData.board.owner) {
                                console.log('é este board');
                                if (gameBoard.cells[allData.position].type === 1) {
                                    console.log('certeiro na muche');
                                    gameBoard.cells[allData.position].type = 2;
                                } else {
                                    console.log('falhaste');
                                    gameBoard.cells[allData.position].type = 3;
                                }
                                allData.totalShoots += 1;
                                console.log('send gameBoard');
                                console.dir(gameBoard);
                            }
                            boards.push(gameBoard);
                            // save to DB


                            const id = new mongodb.ObjectID(data.channel);
                            database.db.collection('games')
                                .findOne({
                                    _id: id
                                })
                                .then(game => {
                                    game.players.forEach(function (player) {
                                        boards.forEach(function (board) {
                                            if (board.owner === player.board.owner) {
                                                player.board = board;
                                            }

                                        }, this);
                                    }, this);

                                    //update
                                    delete game._id;
                                    database.db.collection('games')
                                        .updateOne({
                                            _id: id
                                        }, {
                                            $set: game
                                        })
                                        .then(
                                        )
                                        .catch(err => handleError(err));

                                })
                                .catch(err => handleError(err));


                            wsServer.sockets.emit(data.channel, boards);

                        }, this);
                    }
                }, this);

                /*  TIPOS PARA AS CELULAS
                    tipo 0: agua
                    tipo 1: ships
                    tipo 2: acertaste
                    tipo 3: falhaste
                    */
            });

            wsServer.emit(data.channel, data.boards);
        });


        client.on('joinGame', data => {
            console.log('appSocket: joinGame ');

            client.on(data.channel, allData => {
                console.log('client on channel');
                allDataServer.forEach(function (gameServer) {
                    console.log("foreach");
                    console.dir(gameServer.channel);
                    console.log("foreach data.channel");
                    console.dir(data.channel);
                    if (gameServer.channel === data.channel) {
                        console.log('é este game');
                        let boards = [];
                        let game = [];
                        gameServer.data.forEach(function (gameBoard) {
                            if (gameBoard.owner === allData.board.owner) {
                                console.log('é este board');
                                if (gameBoard.cells[allData.position].type === 1) {
                                    console.log('certeiro na muche');
                                    gameBoard.cells[allData.position].type = 2;
                                } else {
                                    console.log('falhaste');
                                    gameBoard.cells[allData.position].type = 3;
                                }
                                console.log('send gameBoard');
                                console.dir(gameBoard);
                            }
                            boards.push(gameBoard);
                            // save to DB


                            const id = new mongodb.ObjectID(data.channel);
                            database.db.collection('games')
                                .findOne({
                                    _id: id
                                })
                                .then(game => {
                                    game.players.forEach(function (player) {
                                        boards.forEach(function (board) {
                                            if (board.owner === player.board.owner) {
                                                player.board = board;
                                            }

                                        }, this);
                                    }, this);

                                    //update
                                    delete game._id;
                                    database.db.collection('games')
                                        .updateOne({
                                            _id: id
                                        }, {
                                            $set: game
                                        })
                                        .then(
                                        )
                                        .catch(err => handleError(err));

                                })
                                .catch(err => handleError(err));


                            wsServer.sockets.emit(data.channel, boards);

                        }, this);
                    }
                }, this);
            });

        });


        ws.notifyAll = (channel, message) => {
            console.log('send to' + channel + ' this: ' + message);
            wsServer.sockets.emit(channel, message);
        };


        function handleError(err, response) {
            response.send(500, err);
        }
    });
}
