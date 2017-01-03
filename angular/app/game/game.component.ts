import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../_services/websocket.service';

// import { Board } from '../board/index';

@Component({
  moduleId: module.id,
  selector: 'game',
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  boards: any = [];

  constructor(private websocketsService: WebSocketService) {
    console.log('game constructor');

  }

  ngOnInit() {
    // FAZ O SUBSCRIBE AO CANAL 'BOARD'
      console.log('subscribe socket board!');
    this.websocketsService.getBoard().subscribe(data => {
      // NUNCA RECEBE NADA :(
      console.log('receiving data from board');
      this.boards = data;
    });

    /*
    // OLD STUFF FOR CLIENT SIDE
    console.log('Init boards');
    this.boards.push(new Board());
    this.boards.push(new Board());

    this.websocketsService.sendBoard(this.boards);*/

  }
}
