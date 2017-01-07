import { Cell } from './cell';
import { CellType } from './cell';
import { Position } from './position';
import { GameValidator } from './gameValidator';
// import { AlertService } from '../_services/index';

export enum ShipType {
    PortaAvioes,
    Couracado,
    Cruzador,
    ContraTorpedeiro,
    Submarino
}

export enum Orientation {
    Normal,      // Igual ao enunciado
    Roda90,
    Roda180,     // Só para Porta-Aviões
    Roda270,     // Só para Porta-Aviões
}

export class Ship {

    public position: Position;
    public shipType: ShipType;
    public orientation: Orientation;
    public cells: Cell[];
    public posBusy: Position[];
    public posAround: Position[];

    public constructor(tipo: ShipType, orientation: Orientation, line: string, column: number) {
        if (!GameValidator.checkOrientation(tipo, orientation)) {
            if (tipo !== undefined) {
                throw new Error('A orientação "' + orientation + '" é inválida para os navios do tipo  "' + tipo + '".');
            }
        }
        this.position = new Position(line, column);

        if (!GameValidator.checkLimits(tipo, orientation, this.position)) {
            throw new Error('O tipo de navio "' + tipo + '" na posição (' + line + column + ') e orientação "' + orientation + '" não cabe nos limites do tabuleiro');
        }
        this.shipType = +tipo;
        this.orientation = orientation;
        this.cells = [];
        this.posBusy = this.calculaPosicoesOcupadas();
        this.preenchePosicoesVizinhas();
    }


    public addCelula(celula: Cell): void {
        if (!Position.existe(celula.position, this.posBusy)) {
            throw new Error('Não é possível adicionar a célula ao navio.');
        }
        if (Cell.existe(celula, this.cells)) {
            throw new Error('Não é possível adicionar a célula ao navio, porque já existe uma célula na mesma posição.');
        }
        if (celula.pertenceA != null) {
            throw new Error('Não é possível adicionar a célula ao navio, porque já está associada a outro navio.');
        }
        celula.pertenceA = this;
        celula.type = CellType.Ship;
        this.cells.push(celula);
    }

    public totalTiros(): number {
        let total = 0;
        this.cells.forEach(value => {
            value.tiro ? total++ : value.tiro = false;
        });
        return total;
    }

    public afundou(): boolean {
        return this.totalTiros() === Ship.totalCelulasPorshipType(this.shipType);
    }

    // ------------------------------------------------------------------------------------------------
    // Métodos estátios auxiliares
    // ------------------------------------------------------------------------------------------------

    // Devolve o total de cells que um tipo de navio tem
    public static totalCelulasPorshipType(tipo: ShipType): number {
        switch (tipo) {
            case ShipType.PortaAvioes: return 5;
            case ShipType.Couracado: return 4;
            case ShipType.Cruzador: return 3;
            case ShipType.ContraTorpedeiro: return 2;
            case ShipType.Submarino: return 1;
        }
        return 0;
    }

    private calculaPosicoesOcupadas(): Position[] {
        if (this.shipType === ShipType.Submarino) {
            return [new Position(this.position.line, this.position.column)];
        }
        switch (+this.orientation) {
            case Orientation.Normal:
                switch (this.shipType) {
                    case ShipType.ContraTorpedeiro:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.line, this.position.column + 1)
                        ];
                    case ShipType.Cruzador:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.line, this.position.column + 1),
                            new Position(this.position.line, this.position.column + 2)
                        ];
                    case ShipType.Couracado:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.line, this.position.column + 1),
                            new Position(this.position.line, this.position.column + 2),
                            new Position(this.position.line, this.position.column + 3)
                        ];
                    case ShipType.PortaAvioes:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.line, this.position.column + 1),
                            new Position(this.position.line, this.position.column + 2),
                            new Position(this.position.lineAsNumber() + 1, this.position.column + 1),
                            new Position(this.position.lineAsNumber() + 2, this.position.column + 1),
                        ];
                }
                break;
            case Orientation.Roda90:
                switch (this.shipType) {
                    case ShipType.ContraTorpedeiro:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.lineAsNumber() + 1, this.position.column)
                        ];
                    case ShipType.Cruzador:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.lineAsNumber() + 1, this.position.column),
                            new Position(this.position.lineAsNumber() + 2, this.position.column)
                        ];
                    case ShipType.Couracado:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.lineAsNumber() + 1, this.position.column),
                            new Position(this.position.lineAsNumber() + 2, this.position.column),
                            new Position(this.position.lineAsNumber() + 3, this.position.column)
                        ];
                    case ShipType.PortaAvioes:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.lineAsNumber() + 1, this.position.column),
                            new Position(this.position.lineAsNumber() + 2, this.position.column),
                            new Position(this.position.lineAsNumber() + 1, this.position.column - 1),
                            new Position(this.position.lineAsNumber() + 1, this.position.column - 2),
                        ];
                }
                break;
            case Orientation.Roda180:
                switch (this.shipType) {
                    case ShipType.PortaAvioes:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.line, this.position.column - 1),
                            new Position(this.position.line, this.position.column - 2),
                            new Position(this.position.lineAsNumber() - 1, this.position.column - 1),
                            new Position(this.position.lineAsNumber() - 2, this.position.column - 1),
                        ];
                }
                break;
            case Orientation.Roda270:
                switch (this.shipType) {
                    case ShipType.PortaAvioes:
                        return [
                            new Position(this.position.line, this.position.column),
                            new Position(this.position.lineAsNumber() - 1, this.position.column),
                            new Position(this.position.lineAsNumber() - 1, this.position.column + 1),
                            new Position(this.position.lineAsNumber() - 1, this.position.column + 2),
                            new Position(this.position.lineAsNumber() - 2, this.position.column),
                        ];
                }
        }
        throw new Error('Houve um erro ao calcular as posições do navio. #Debug-> Ship:' + this.shipType + ' orientation: ' + this.orientation);
    }

    private preenchePosicoesVizinhas(): void {
        let vizinhas: Position[] = [];
        this.posBusy.forEach(p => {
            let linhaInf = p.lineAsNumber() - 1;
            let linhaSup = linhaInf + 2;
            let colunaInf = p.column - 1;
            let colunaSup = colunaInf + 2;
            linhaInf = linhaInf < 1 ? 1 : linhaInf;
            linhaSup = linhaSup > 10 ? 10 : linhaSup;
            colunaInf = colunaInf < 1 ? 1 : colunaInf;
            colunaSup = colunaSup > 10 ? 10 : colunaSup;
            for (let i = linhaInf; i <= linhaSup; i++) {
                for (let j = colunaInf; j <= colunaSup; j++) {
                    vizinhas.push(new Position(i, j));
                }
            }
        });
        // Extrair posições repetidas do array
        this.posAround = Position.removeRepetidos(vizinhas);
    }
}
