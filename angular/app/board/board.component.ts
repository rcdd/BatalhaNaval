import { Component } from '@angular/core';
import { Cell } from './cell';

@Component({
    moduleId: module.id,
    selector: 'board-panel',
    templateUrl: 'board.component.html'
})

export class BoardPanel {
    public cells: Cell[][];

    for(let i:number = 0; i< 10; i++) {
        this.cells[i] = [];
        for (let j: number = 0; j < 10; j++) {
            this.cells[i][j] = new Cell();
        }
    }

    /*constructor() {
        // cells = [];


    }*/

    // ------------------------------------------------------------------------------------------------
    // Métodos estátios auxiliares
    // ------------------------------------------------------------------------------------------------

    public todasLinhas(): string[] {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    }

    public todasColunas(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
}



