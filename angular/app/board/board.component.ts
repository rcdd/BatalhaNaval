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
    boardNr: number;
    @Input()
    shooter: any;
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
    @Input()
    username: any;
    @Input()
    currentPlayer: any;
    @Input()
    totalShoots: any;

    constructor(private websocketsService: WebSocketService, private alertService: AlertService) {
    }

    ngOnInit() {
    }

    Shoot(position: number) {
        console.log(this.boardNr);
        if (this.boardNr !== 0) {
            if (this.board.cells[position].type < 2) {
                this.websocketsService.sendShoot(position, this.board, this.shooter, this.idGame, this.currentPlayer, this.totalShoots);
            }
        }
    };


    click(line: number, column: number) {
        this.alertService.subject.next();
        let lineAsString: string = String.fromCharCode(65 + (line / 10));
        console.dir(this.selectedShip);
        if (this.selectedShip !== undefined) {
            if (this.selectedShip.id !== '') {
                let ship: any = '';
                ship = this.newBoard.adicionaNavio(this.selectedShip.value, +this.selectedOrientation, lineAsString, column + 1);


                if (!(ship instanceof Error)) {
                    let i = 0;
                    this.listShip.forEach((list: any) => {
                        if (this.selectedShip.id === list.id) {
                            this.selectedShip.id = '';
                            this.listShip.splice(i, 1);
                        }
                        i++;
                    });
                    this.selectedShip = this.listShip[this.selectedShipSelector];
                } else {
                    this.alertService.error(ship.message);
                }
            }
        } else {
            this.alertService.error('Please, select a ship!');
        }
    };
}
