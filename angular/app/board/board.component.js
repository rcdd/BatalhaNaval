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
var board_1 = require('./board');
var websocket_service_1 = require('../_services/websocket.service');
var BoardComponent = (function () {
    function BoardComponent(websocketsService) {
        this.websocketsService = websocketsService;
        this.listShip = [];
    }
    BoardComponent.prototype.ngOnInit = function () {
    };
    BoardComponent.prototype.Shoot = function (position) {
        var data = this.board;
        data.cells[position].type = 1;
        this.websocketsService.sendShoot(data, this.index);
    };
    ;
    BoardComponent.prototype.click = function (line, column) {
        console.log('click, linha: ' + (line / 10) + ', column: ' + (column + 1));
        var lineAsString = String.fromCharCode(65 + (line / 10));
        console.log('coiso: ');
        console.dir(this.selectedShip.value);
        this.newBoard.adicionaNavio(this.selectedShip.value, +this.selectedOrientation, lineAsString, column + 1);
        this.listShip[this.selectedShip.id] = '';
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BoardComponent.prototype, "board", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BoardComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', board_1.Board)
    ], BoardComponent.prototype, "newBoard", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BoardComponent.prototype, "selectedShip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BoardComponent.prototype, "selectedOrientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BoardComponent.prototype, "listShip", void 0);
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
