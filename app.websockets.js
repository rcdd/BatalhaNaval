const io = require('socket.io');
const ws = module.exports = {};

let wsServer = null;

ws.init = (server) => {
    wsServer = io.listen(server);
    wsServer.sockets.on('connection', function (client) {
        // TODO
        // 1a)
        client.emit('players', Date.now() + "   Welcome to battleship");
        // 1b)
        client.broadcast.emit('players', "A new player has arrived");

        // 3)
        client.on('chat', data => {
            console.log(data);
            wsServer.emit('chat', data);
        });
    });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};
