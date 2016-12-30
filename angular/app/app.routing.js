"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./login/index');
var index_2 = require('./register/index');
var index_3 = require('./home/index');
var index_4 = require('./_guard/index');
var index_5 = require('./game/index');
// import { BoardComponent } from './board/index';
var appRoutes = [
    { path: '', component: index_3.HomeComponent, canActivate: [index_4.AuthGuard] },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_2.RegisterComponent },
    { path: 'game', component: index_5.GameComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);

//# sourceMappingURL=app.routing.js.map