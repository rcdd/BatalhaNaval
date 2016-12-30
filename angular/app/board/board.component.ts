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
    board: any[];
    @Input()
    index: number;

    constructor(private websocketsService: WebSocketService) {

    }

    ngOnInit() {

    }

    clickHandler(event: any, index: number, cell: any) {
        let data = this.board.slice(0);
        data[index]++;
        this.websocketsService.sendClick({ board: data, index: this.index });
    }


    getClassForCell(index: number) {
        let value = this.board[index];
        if (value === 0) {
            return '';
        }
        if (value < 5) {
            return 'cell1';
        }
        return 'cell2';
    }



   /* Shoot(position: number, board: Board) {
        let json = {
            date: new Date(),
            position: position,
            board: board,
            user: this.authService.user
        };

        console.log('Shoot: ' + json.position + 'on board: ' + json.board);

        this.websocketService.sendShoot(json);
    };*/
}
