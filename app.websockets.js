/* jshint node: true */
'use strict';
const io = require('socket.io');
// const Board = require('./angular/app/board/board');

const ws = module.exports = {};

let wsServer = null;

var allData = [];

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        client.emit('players', ' Welcome to battleship');
        client.broadcast.emit('players', 'A new player has arrived');

        client.on('chat', data => {
            // console.log(data);
            wsServer.emit('chat', data);
        });

        client.on('lists', data => {
            console.log('appSocket: Alert List Received ');
            client.broadcast.emit('lists');
        });

        /*position: position,
        board: board,
        owner: owner,
        listBoardInGame: listBoardInGame
        listBoardsToShoot: listBoardsToShoot*/

        client.on('startGame', data => {
            console.log('appSocket: createGame ');
            console.dir(data);
            this.allData = { channel: data.channel, data: data.boards };
            client.on(data.channel, allData => {
                console.dir(allData);
                // FAZ COISAS
                allData.listBoardInGame.forEach(function (boardInGame) {
                    if (boardInGame.owner == allData.board.owner) {
                        allData.listBoardsToShoot.forEach(function (boardToShoot) {
                            if (boardInGame.owner == boardToShoot.owner) {
                                if (boardInGame.cells[allData.position].type === 1) {
                                    console.log('acertaste');
                                    boardToShoot.cells[allData.position].type = 2;
                                } else {
                                    console.log('nabo.. : ');
                                    boardToShoot.cells[allData.position].type = 3;
                                }
                                /*  tipo 0: agua
                                    tipo 1: ships
                                    tipo 2: acertaste
                                    tipo 3: falhaste
                                    */

                            }
                        }, this);
                    }

                }, this);
                wsServer.sockets.emit(data.channel, allData);
            });

            wsServer.emit(data.channel, data.boards);
        });
    });
};

ws.notifyAll = (channel, message) => {
    console.log('send to' + channel + ' this: ' + message);
    wsServer.sockets.emit(channel, message);
};
