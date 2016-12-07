export class Position {

    public line: string;
    public column: number;

    // Extrair posições repetidas de um array
    public static removeRepetidos(posicoes: Position[]): Position[] {
        let result: Position[] = [];
        for (let i = 0; i < posicoes.length; i++) {
            if (!Position.existe(posicoes[i], result)) {
                result.push(posicoes[i]);
            }
        }
        return result;
    }

    // Faz o merge de 2 arrays de Posicoes e retira os repetidos
    public static merge(posicoes1: Position[], posicoes2: Position[]): Position[] {
        let result: Position[] = posicoes1;
        result = result.concat(posicoes2);
        return Position.removeRepetidos(result);
    }

    // Verifica se uma determinada posição existe num array
    public static existe(posicao: Position, arrayPosicoes: Position[]): boolean {
        for (let i = 0; i < arrayPosicoes.length; i++) {
            if (posicao.sobreposicao(arrayPosicoes[i])) {
                return true;
            }
        }
        return false;
    }

    // Verifica se existe algum conflito entre 2 arrays de posições
    // Considera-se que há conflito, se pelo menos uma posição aparecer nos 2 arrays
    public static conflito(arrayPosicoes1: Position[], arrayPosicoes2: Position[]): boolean {
        for (let i = 0; i < arrayPosicoes1.length; i++) {
            if (Position.existe(arrayPosicoes1[i], arrayPosicoes2)) {
                return true;
            }
        }
        return false;
    }


    public strValue(): string {
        return this.line + this.column;
    }

    public lineAsNumber(): number {
        return this.line.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    }

    // index a começar em zero (A=0; B=1)
    public lineIndex(): number {
        return this.lineAsNumber() - 1;
    }

    // index a começar em zero (column1=0; column2=1)
    public columnIndex(): number {
        return this.column - 1;
    }

    public sobreposicao(p: Position) {
        return (p.line === this.line) && (p.column === this.column);
    }


    public constructor(line: string|number, column: number) {
        let lineLetter: string;
        if (typeof line === 'string') {
            lineLetter = line[0];
        } else {
            lineLetter = String.fromCharCode('A'.charCodeAt(0) + line - 1);
        }
        this.line = lineLetter;
        this.column = column;
    }

}
