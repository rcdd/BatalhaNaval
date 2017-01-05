import {Board} from './board';
import {ShipType} from './ship';
import {Orientation} from './ship';
import {Position} from './position';


export class GameValidator {
    public static checkcolumn(column: number): boolean {
        if ((column < 1) || (column > 10)) {
            return false;
        }
        return true;
    }
    
    public static checkline(line: string): boolean {
        return Board.todasLinhas().indexOf(line) > -1;
    }

    public static checkOrientation(type: ShipType, orientation: Orientation): boolean {
        switch (+type) {
            case ShipType.PortaAvioes: 
                return true;
            case ShipType.Couracado:   
            case ShipType.Cruzador: 
            case ShipType.ContraTorpedeiro: 
                return (orientation === Orientation.Normal) || (orientation === Orientation.Roda90);
            case ShipType.Submarino: 
                return (orientation === Orientation.Normal);            
        }
        alert('asdfdgsf');
    }

    public static checkLimits(type: ShipType, orientation: Orientation, Position: Position): boolean {
        if (type === ShipType.Submarino) {
            return true;
        }

        let offsetVertical = 0;
        let offsetHorizontal = 0;
        switch (orientation) {
            case Orientation.Normal:
                switch (type) {
                    case ShipType.PortaAvioes:
                        offsetVertical = 2;
                        offsetHorizontal = 2;
                        break; 
                    case ShipType.Couracado: 
                        offsetHorizontal = 3;
                        break; 
                    case ShipType.Cruzador: 
                        offsetHorizontal = 2;
                        break; 
                    case ShipType.ContraTorpedeiro: 
                        offsetHorizontal = 1;
                        break; 
                }
                break;
            case Orientation.Roda90:
                switch (type) {
                    case ShipType.PortaAvioes:
                        offsetVertical = 2;
                        offsetHorizontal = -2;
                        break; 
                    case ShipType.Couracado: 
                        offsetVertical = 3;
                        break; 
                    case ShipType.Cruzador: 
                        offsetVertical = 2;
                        break; 
                    case ShipType.ContraTorpedeiro: 
                        offsetVertical = 1;
                        break; 
                }
                break;
            case Orientation.Roda180:
                if (type === ShipType.PortaAvioes) {
                    offsetVertical = -2;
                    offsetHorizontal = -2;
                } else {
                    return false;
                }
                break;
            case Orientation.Roda270:
                if (type === ShipType.PortaAvioes) {
                    offsetVertical = -2;
                    offsetHorizontal = 2;
                } else {
                    return false;
                }
        }
        
        if (((Position.column + offsetHorizontal) < 1) || ((Position.column + offsetHorizontal) > 10)) {
            return false;
        }

        if (((Position.lineAsNumber() + offsetVertical) < 1) || ((Position.lineAsNumber() + offsetVertical) > 10)) {
            return false;
        }
       return true;
    }
}
