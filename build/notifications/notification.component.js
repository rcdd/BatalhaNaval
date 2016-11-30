"use strict";
;
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
            var show = ';)[' + m.user.name + '] ' + m.message;
            _this.chatChannel.push(show);
        });
    };
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;

//# sourceMappingURL=notification.component.js.map
