import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {
    socket: SocketIOClient.Socket;
    boards: any = [];

    constructor() {
        if (!this.socket) {
            this.socket = io(`http://${window.location.hostname}:${window.location.port}`);
            this.socket.on('newGame', function (data: any) {
                console.log('webSocket: constructor. Data:');
                console.dir(data);
                this.boards = data;
            });
        }
    }


    sendShoot(board: any, index: number) {
        this.boards[index] = board;
        this.socket.emit('shoot', this.boards);
    }

    /*getShootMessages(): Observable<any> {

        console.log('getShootMessages function');
        return new Observable((observer: any) => {
            this.socket.on('shoot', (data: any) => {
                this.boards = data;
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    } */

    newGame(): any {
        console.log('webSocket: newGame. Data:');
        console.dir(this.boards);
        return this.boards;
    }

    sendBoard(boards: any) {
        console.log('websocket: send board:');
        console.dir(boards);
        this.boards = boards;
        this.socket.emit('board', this.boards);
    }

    // ESCUTA O CANAL 'BOARD' ATÉ OBTER DADOS
    getBoard(): Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on('board', (data: any) => {
                console.log('websocket: get board:');
                console.dir(data);
                this.boards = data;
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }


    sendChatMessage(message: any) {
        this.socket.emit('chat', message);
    }

    getPlayersMessages(): Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on('players', (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

    getChatMessages(): Observable<any> {
        // TODO: study the getPlayersMessages to implement this method
        return new Observable((observer: any) => {
            this.socket.on('chat', (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }
    


}
