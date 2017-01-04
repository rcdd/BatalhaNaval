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


        client.on('board', data => {
            console.log('appSocket: Board received ' + data.length);
            //console.dir(data);
            boards = data;
            wsServer.sockets.emit('board', boards);
        });

        client.on('shoot', data => {
            console.log('appSocket: shoot ' + data);
            boards = data;
            wsServer.sockets.emit('board', data);
        });
    });
};

ws.notifyAll = (channel, message) => {
    console.log('send to' + channel + ' this: ' + message);
    wsServer.sockets.emit(channel, message);
};
