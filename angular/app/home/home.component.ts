import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { WebSocketService } from '../_services/websocket.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: string;

    constructor(private authService: AuthService, private websocketsService: WebSocketService) {
        this.currentUser = this.authService.user;
    }

    ngOnInit() {
    }
}
