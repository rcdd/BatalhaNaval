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
var websocket_service_1 = require('./websocket.service');
var NotificationComponent = (function () {
    function NotificationComponent(websocketService) {
        this.websocketService = websocketService;
        this.playersChannel = [];
        this.chatChannel = [];
    }
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // TODO: subscribe each type of event on websocketService
        // Every time a message is served just push it to the proper channel
        this.websocketService.getPlayersMessages().subscribe(function (m) {
            console.log(m);
            _this.playersChannel.push(m);
        });
        this.websocketService.getChatMessages().subscribe(function (m) {
            console.log(m);
            var show = '[' + m.user.name + '] ' + m.message;
            _this.chatChannel.push(show);
        });
    };
    NotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notification-panel',
            templateUrl: 'notification.component.html'
        }), 
        __metadata('design:paramtypes', [websocket_service_1.WebSocketService])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map