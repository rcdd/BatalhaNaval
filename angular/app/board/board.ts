import { Ship } from './ship';
import { Orientation } from './ship';
import { Cell } from './cell';
import { Position } from './position';

export class Board {
    ships: Ship[];
    cells: Cell[];
    public positionBusy: Position[];
    public test: string;

    public static todasLinhas(): string[] {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    }

    public static todasColunas(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    constructor() {

        this.cells = [];
        this.positionBusy = [];
        this.ships = [];
        Board.todasLinhas().forEach(letra => {
            Board.todasColunas().forEach(coluna => {
                let c: Cell = new Cell(letra, coluna);
                this.cells.push(c);
            });
        });
    }

    public getCelula(linha: string, coluna: number): Cell {
        let pos: Position = new Position(linha, coluna);
        return this.cells[pos.lineIndex() * 10 + pos.columnIndex()];
    }

    public adicionaNavio(type: any, orientation: Orientation, line: string, column: number): Ship {
        try {
            let ship: Ship = new Ship(type, orientation, line, column);
            if (Position.conflito(ship.posBusy, this.positionBusy)) {
                throw new Error('O ship "' + type + '" na posição (' + line + column + ') com orientação "' + orientation + '" está em sobreposição ou encostado a um ship já existente');
            }
            ship.posBusy.forEach(p => {
                ship.addCelula(this.getCelula(p.line, p.column));
            });
            this.positionBusy = Position.merge(this.positionBusy, ship.posBusy);
            this.ships.push(ship);
            return ship;
        } catch (e) {
            return e;
            // alert(e + 'ola');
        }
    }

}
