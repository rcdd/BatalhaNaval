import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';

import { AuthService } from '../_services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {
    message: string;
    chatChannel: string[] = [];

    constructor(private websocketService: WebSocketService,
        private authService: AuthService) { }

    ngOnInit() {
        // TODO: subscribe each type of event on websocketService
        // Every time a message is served 
        this.websocketService.getChatMessages().subscribe(
            m => {
                // console.log(m);

                let show = m.date + ': [' + m.user.name + '] ' + m.message;

                this.chatChannel.push(show);
            });
    }

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
