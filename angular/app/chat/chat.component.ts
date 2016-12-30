import { Component } from '@angular/core';
import {WebSocketService } from '../_services/websocket.service';

import { AuthService } from '../_services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent {
    message: string;

    constructor(private websocketService: WebSocketService,
                private authService: AuthService) {}

    send(): void {
        // TODO: sends a chat messsage
        let json = {
            date: new Date(),
            user: this.authService.user,
            message: this.message
        };

        this.websocketService.sendChatMessage(json);
        this.message = '';
    }
}
