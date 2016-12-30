"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// import { Board } from './board';
// import { ShipType } from './ship';
// import { Orientation } from './ship';
// import { AuthService } from '../_services/auth.service';
var websocket_service_1 = require('../_services/websocket.service');
var BoardComponent = (function () {
    function BoardComponent(websocketsService) {
        this.websocketsService = websocketsService;
    }
    BoardComponent.prototype.ngOnInit = function () {
    };
    BoardComponent.prototype.clickHandler = function (event, index, cell) {
        var data = this.board.slice(0);
        data[index]++;
        this.websocketsService.sendClick({ board: data, index: this.index });
    };
    BoardComponent.prototype.getClassForCell = function (index) {
        var value = this.board[index];
        if (value === 0) {
            return '';
        }
        if (value < 5) {
            return 'cell1';
        }
        return 'cell2';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BoardComponent.prototype, "board", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BoardComponent.prototype, "index", void 0);
    BoardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'board',
            templateUrl: 'board.component.html'
        }), 
        __metadata('design:paramtypes', [websocket_service_1.WebSocketService])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;

//# sourceMappingURL=board.component.js.map
