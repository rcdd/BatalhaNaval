import { Component, OnInit, Input } from '@angular/core';
import { Board } from './board';
import { WebSocketService, AlertService } from '../_services/index';

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

    constructor(private websocketsService: WebSocketService, private alertService: AlertService) {

    }

    ngOnInit() {
    }

    Shoot(position: number) {
        let data = this.board;
        data.cells[position].type = 1;
        this.websocketsService.sendShoot(data, this.index);
    };

    click(line: number, column: number) {
        // console.log('click, linha: ' + (line / 10) + ', column: ' + (column + 1));
        let lineAsString: string = String.fromCharCode(65 + (line / 10));

        let ship: any = '';
        ship = this.newBoard.adicionaNavio(this.selectedShip.value, +this.selectedOrientation, lineAsString, column + 1);
        if (ship !== undefined) {
            let i = 0;
            this.listShip.forEach(list => {
                if (this.selectedShip.id === list.id) {
                    this.listShip.splice(i, 1);
                }
                i++;
            });
        }
    };
}
