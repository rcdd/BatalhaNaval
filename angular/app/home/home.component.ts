import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
// import { Board } from '../board/index';
import { WebSocketService } from '../_services/websocket.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUser: string;

    constructor(private authService: AuthService, private websocketsService: WebSocketService) {
        this.currentUser = this.authService.user;

        /*console.log('Init boards');
        let board: any = [];
        for (let i = 0; i < 100; i++) {
            board.push(0);
        }
        let boards: any = [];
        boards.push(board.slice(0));
        boards.push(board.slice(0));
        boards.push(board.slice(0));


        websocketsService.sendBoard(boards);*/
    }
}
