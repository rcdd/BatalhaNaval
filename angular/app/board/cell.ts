import {Position} from './position';
import {Ship} from './ship';

export enum CellType {
    Sea,
    Ship
}

export class Cell {

        public position: Position;
        public type: CellType;
        public tiro: Boolean;
        public pertenceA: Ship;

        // Verifica se uma determinada celula existe num array
        public static existe(c: Cell, cellsArray: Cell[]): boolean {
            for (let i = 0; i < cellsArray.length; i++) {
                if (c.sobreposicao(cellsArray[i])) {
                    return true;
                }
            }
            return false;
        }

        public constructor (linha: string, coluna: number) {
            this.position = new Position(linha, coluna);
            this.type = CellType.Sea;
            this.tiro = false;
            this.pertenceA = null;
        }

        public sobreposicao(c: Cell) {
            return (c.position.line === this.position.line) && (c.position.column === this.position.column);
        }
}
