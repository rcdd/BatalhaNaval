import { Component, OnInit, Input } from '@angular/core';
import { Board } from './board';
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
    @Input()
    newBoard: Board;
    @Input()
    selectedShip: any;
    @Input()
    selectedOrientation: any;
    @Input()
    listShip: any = [];

    constructor(private websocketsService: WebSocketService) {
    }

    ngOnInit() {
    }

    Shoot(position: number) {
        let data = this.board;
        data.cells[position].type = 1;
        this.websocketsService.sendShoot(data, this.index);
    };

    click(line: number, column: number) {
        console.log('click, linha: ' + (line / 10) + ', column: ' + (column + 1));
        let lineAsString: string = String.fromCharCode(65 + (line / 10));
        console.log('coiso: ');
        console.dir(this.selectedShip.value);
        this.newBoard.adicionaNavio(this.selectedShip.value, +this.selectedOrientation, lineAsString, column + 1);
        this.listShip[this.selectedShip.id] = '';
    };
}
