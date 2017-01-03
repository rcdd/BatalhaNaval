const io = require('socket.io');
const Board = require('./angular/app/board/board');

const ws = module.exports = {};

let wsServer = null;

var board = [];
for (let i = 0; i < 100; i++) {
    board.push(0);
}
var boards = [];
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

        // COMO FAÇO PARA CRIAR UMA NOVA INSTANCIA DE 'BOARD' AQUI?
        // POR EXEMPLO, TIPO EM JAVA: BOARD board = NEW BOARD();
        // boards.push(new Board());
        

        // EMITE AS BOARDS
        console.dir(boards);
        client.emit('board', boards);

        /*client.on('board', data => {
            console.log('Board ' + data);
            wsServer.sockets.emit('board', data);
        });*/

        /*
        client.on('shoot', data => {
            console.log('shoot ' + data);
            this.boards = data;
            wsServer.sockets.emit('board', data);
        });
        */
    });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};
