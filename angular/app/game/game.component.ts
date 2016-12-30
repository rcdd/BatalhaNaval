import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../_services/websocket.service';

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
     this.websocketsService.getBoard().subscribe(data => this.boards = data);
     console.log('receive: ');
     console.dir(this.boards);

   }
}
