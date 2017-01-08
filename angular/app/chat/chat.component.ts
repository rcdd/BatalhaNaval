import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';

import { AuthService } from '../_services/auth.service';

import { ChatService } from '../_services/chat.service';

import 'rxjs/add/operator/scan';



@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {
    message: string;
    chatChannel: string[] = [];
    hidechat = false;

    minimize =  false;

    constructor(private websocketService: WebSocketService,
        private authService: AuthService, private chatService: ChatService) {

    }

    ngOnInit() {
        this.chatChannel = this.chatService.getMessage();
        /*this.websocketService.getChatMessages().subscribe(
            m => {
                let show =  '[' + m.user.name + ']\n ' + m.message;
                this.chatChannel.push(show);

            });*/
    }

    send(): void {
        let show =  '[' + this.authService.user.name + ']\n ' + this.message;
        let json = {
            date: new Date(),
            user: this.authService.user,
            message: this.message
        };

        this.websocketService.sendChatMessage(json);
        this.chatService.setMessage(show);
        this.message = '';

    }

    closeChat(): void {
        console.log(this.minimize);
        this.minimize = (this.minimize ? false : true);
    }

}
