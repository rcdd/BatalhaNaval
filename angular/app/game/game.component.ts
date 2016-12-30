import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../_services/websocket.service';

import { Board } from '../board/index';

@Component({
  moduleId: module.id,
  selector: 'game',
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  boards: any[];

  constructor(private websocketsService: WebSocketService) { 

  }

  ngOnInit() {
    console.log('Init boards');
        let boards: any = [];
        boards.push(new Board());
        boards.push(new Board());
        boards.push(new Board());
        boards.push(new Board());


        this.websocketsService.sendBoard(boards);

     this.websocketsService.getBoard().subscribe(data => this.boards = data);
     console.log('receive: ');
     console.dir(this.boards);
     // this.websocketsService.sendBoard(this.boards);

   }
}
