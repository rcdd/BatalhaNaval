const io = require('socket.io');
const ws = module.exports = {};

let wsServer = null;

let board = [];
for (let i = 0; i < 100; i++) {
    board.push(0);
}
let boards = [];
boards.push(board.slice(0));
boards.push(board.slice(0));
boards.push(board.slice(0));

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        client.emit('players', Date.now() + ' Welcome to battleship');

        client.broadcast.emit('players', 'A new player has arrived');

        client.on('chat', data => {
            console.log(data);
            wsServer.emit('chat', data);
        });



        client.emit('board', boards);
    });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};
