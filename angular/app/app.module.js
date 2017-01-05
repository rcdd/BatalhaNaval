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
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var http_1 = require("@angular/http");
var index_1 = require("./chat/index");
var websocket_service_1 = require("./_services/websocket.service");
var index_2 = require("./_services/index");
var index_3 = require("./_alert/index");
var index_4 = require("./game/index");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var board_module_1 = require("./board/board.module");
var notifications_module_1 = require("./notifications/notifications.module");
var index_5 = require("./_guard/index");
var index_6 = require("./login/index");
var index_7 = require("./register/index");
var index_8 = require("./topten/index");
var index_9 = require("./home/index");
var common_1 = require("@angular/common");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            ng_bootstrap_1.NgbModule.forRoot(),
            platform_browser_1.BrowserModule,
            notifications_module_1.NotificationModule,
            forms_1.FormsModule,
            board_module_1.BoardComponentModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.ChatComponent,
            index_4.GameComponent,
            index_6.LoginComponent,
            index_7.RegisterComponent,
            index_3.AlertComponent,
            index_8.TopTenComponent,
            index_9.HomeComponent
        ],
        providers: [
            websocket_service_1.WebSocketService,
            index_5.AuthGuard,
            index_2.AuthService,
            index_2.AlertService,
            { provide: common_1.APP_BASE_HREF, useValue: '/' }
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
