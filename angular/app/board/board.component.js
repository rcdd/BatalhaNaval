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
var cell_1 = require('./cell');
var BoardPanel = (function () {
    function BoardPanel() {
        this.cells = [];
        for (var i = 0; i < 10; i++) {
            this.cells[i] = [];
            for (var j = 0; j < 10; j++) {
                this.cells[i][j] = new cell_1.Cell(String(i + j));
            }
        }
    }
    // ------------------------------------------------------------------------------------------------
    // Métodos estátios auxiliares
    // ------------------------------------------------------------------------------------------------
    BoardPanel.prototype.todasLinhas = function () {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    };
    BoardPanel.prototype.todasColunas = function () {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    };
    BoardPanel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'board-panel',
            templateUrl: 'board.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], BoardPanel);
    return BoardPanel;
}());
exports.BoardPanel = BoardPanel;

//# sourceMappingURL=board.component.js.map
