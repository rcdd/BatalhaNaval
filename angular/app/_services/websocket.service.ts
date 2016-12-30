import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {
    socket: any;
    constructor() {
        if (!this.socket) {
            this.socket = io(`http://${window.location.hostname}:${window.location.port}`);
        }
    }

    sendChatMessage(message: any) {
        this.socket.emit('chat', message);
    }

    sendShoot(data: any) {
        console.log('sendShoot function');
        this.socket.emit('shoot', data);
    }

    sendBoard(boards: any) {
        console.log('emit boards @ ' + boards);
        console.dir(boards);
        this.socket.emit('board', boards);
    }

    getBoard(): Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on('board', (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
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

    getShootMessages(): Observable<any> {

        console.log('getShootMessages function');
        return new Observable((observer: any) => {
            this.socket.on('shoot', (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

    sendClick(board: any) {
        this.socket.emit('click', board);
    }
}
