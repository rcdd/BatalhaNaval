import { Component, OnInit, Input } from '@angular/core';
// import { Board } from './board';

// import { ShipType } from './ship';
// import { Orientation } from './ship';
// import { AuthService } from '../_services/auth.service';
import { WebSocketService } from '../_services/websocket.service';

@Component({
    moduleId: module.id,
    selector: 'board',
    templateUrl: 'board.component.html'
})

export class BoardComponent implements OnInit {
    @Input()
    board: any;
    @Input()
    index: number;

    constructor(private websocketsService: WebSocketService) {
    }

    ngOnInit() {
    }

    Shoot(position: number) {
        let data = this.board;
        data.cells[position].type = 1;
        this.websocketsService.sendShoot( data, this.index);
    };
}
