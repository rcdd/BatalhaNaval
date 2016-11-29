import { Component } from '@angular/core';
import {WebSocketService } from './notifications/websocket.service';

import { AuthService} from './auth.service'

@Component({
    moduleId: module.id,
    selector: 'chat-control',
    templateUrl: 'chat.component.html'
})
export class ChatComponent {
    message: string;

    constructor(private websocketService: WebSocketService,
                private authService: AuthService) {}
    send(): void {
        // TODO: sends a chat messsage

        let json = {
            user: this.authService.user,
            message: this.message
        }

        this.websocketService.sendChatMessage(json);
        this.message = '';
    }
}
