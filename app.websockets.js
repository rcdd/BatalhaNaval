const io = require('socket.io');
const ws = module.exports = {};

let wsServer = null;

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        client.emit('players', Date.now() + ' Welcome to battleship');

        client.broadcast.emit('players', 'A new player has arrived');

        client.on('chat', data => {
            console.log(data);
            wsServer.emit('chat', data);
        });

        client.on('board', data => {
            console.log('Board ' + data);
            wsServer.sockets.emit('board', data);
        });
    });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};
