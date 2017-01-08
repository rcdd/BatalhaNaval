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
    index: any;
    @Input()
    newBoard: Board;
    @Input()
    selectedShip: any;
    @Input()
    selectedOrientation: any;
    @Input()
    listShip: any = [];
    @Input()
    selectedShipSelector: any;
    @Input()
    idGame: any;
    @Input()
    listBoardsInGame: any;
    @Input()
    listBoardsToShoot: any;

    constructor(private websocketsService: WebSocketService, private alertService: AlertService) {

    }

    ngOnInit() {
    }
/* OLD
    Shoot(position: number) {
        console.log(this.index);
        console.log('BOARD Component SHOOT');
        console.dir(this.listBoardsInGame);
        this.websocketsService.sendShoot(position, this.board, this.index, this.idGame, this.listBoardsInGame, this.listBoardsToShoot);
}; */

    Shoot(position: number) {
        console.log(this.index);
        console.log('BOARD Component SHOOT');
        this.websocketsService.sendShoot(position, this.board, this.index, this.idGame);
    };

    click(line: number, column: number) {
        // console.log('click, linha: ' + (line / 10) + ', column: ' + (column + 1));
        let lineAsString: string = String.fromCharCode(65 + (line / 10));
        console.dir(this.selectedShip);
        if (this.selectedShip !== undefined) {
            if (this.selectedShip.id !== '') {
                this.alertService.subject.next();
                let ship: any = '';
                ship = this.newBoard.adicionaNavio(this.selectedShip.value, +this.selectedOrientation, lineAsString, column + 1);
                if (ship !== undefined) {
                    let i = 0;
                    this.listShip.forEach((list: any) => {
                        if (this.selectedShip.id === list.id) {
                            this.selectedShip.id = '';
                            this.listShip.splice(i, 1);
                        }
                        i++;
                    });
                    this.selectedShip = this.listShip[this.selectedShipSelector];
                }
            }
        } else {
            this.alertService.error('Please, select a ship!');
        }
    };
}
