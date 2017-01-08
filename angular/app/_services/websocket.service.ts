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
        }
    }

    sendShoot(position: any, board: any, owner: number, idGame: any) {
        // this.boards[index] = board;
        console.log(idGame);

        let json = {
            position: position,
            board: board,
            shooter: owner,
        };
        console.log('SEND TO SERVER SHOOT:');
        console.dir(json);
        this.socket.emit(idGame, json);
    }

    // ESCUTA O CANAL 'IDGAME' ATÉ OBTER SHOOT'S
    getShoot(idGame: any): Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on(idGame, (data: any) => {
                console.log('websocket: get shoot:');
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


    sendLists() {
        console.log('websocket: send Lists');
        this.socket.emit('lists');
    }

    getListAlert(): Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on('lists', (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

    sendGame(channel: any, boards: any) {
        this.socket.emit(channel, boards);
        console.log('websocket send game');
    }

    createGame(channel: any, boards: any) {
        this.socket.emit('startGame', { channel: channel, boards: boards });
    }

    joinGame(channel: any) {
        this.socket.emit('joinGame', { channel: channel });
    }

    getBoardsGame(channel: any): Observable<any> {
        // TODO: study the getPlayersMessages to implement this method
        console.log('set channel listen:' + channel);
        return new Observable((observer: any) => {
            this.socket.on(channel, (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

}
