/* jshint node: true */
'use strict';
const io = require('socket.io');
// const Board = require('./angular/app/board/board');

const ws = module.exports = {};

let wsServer = null;

var boards = [];

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        client.emit('players', ' Welcome to battleship');
        client.broadcast.emit('players', 'A new player has arrived');

        client.on('chat', data => {
            // console.log(data);
            wsServer.emit('chat', data);
        });

        // EMITE AS BOARDS
        // console.dir(boards);
        // client.emit('newGame', boards);

        client.on('lists', data => {
            console.log('appSocket: Alert List Received ');
            client.broadcast.emit('lists');
        });

        client.on('shoot', data => {
            console.log('appSocket: shoot ');
            console.dir(data);
            boards = data;
            wsServer.sockets.emit('board', data);
        });

            /*position: position,
            board: board,
            owner: owner,
            listBoardInGame: listBoardInGame
            listBoardsToShoot: listBoardsToShoot*/

        client.on('startGame', data => {
            console.log('appSocket: createGame ');
            console.dir(data);
            client.on(data.channel, allData => {
                console.dir(allData);
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
