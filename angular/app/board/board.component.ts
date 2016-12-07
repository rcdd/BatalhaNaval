import { Component } from '@angular/core';
import { Board } from './board';

 import { ShipType } from './ship';
 import { Orientation } from './ship';

@Component({
    moduleId: module.id,
    selector: 'board',
    templateUrl: 'board.component.html'
})

export class BoardComponent {
    board: Board = new Board();
    
    constructor () {
        this.board.adicionaNavio(ShipType.Cruzador, Orientation.Roda90, 'B', 5);
        this.board.adicionaNavio(ShipType.Submarino, Orientation.Normal, 'F', 8);
        this.board.adicionaNavio(ShipType.PortaAvioes, Orientation.Normal, 'G', 5);
    }
}
