import { Component, OnInit } from '@angular/core';

import {WebSocketService } from './websocket.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];
    chatChannel: string[] = [];

    constructor(private websocketService: WebSocketService){
    }

    ngOnInit() {
        // TODO: subscribe each type of event on websocketService
        // Every time a message is served just push it to the proper channel
        this.websocketService.getPlayersMessages().subscribe(
            m => {
                console.log(m);
                this.playersChannel.push(m)
            })
        this.websocketService.getChatMessages().subscribe(
            m => {
                console.log(m);

                let show = '['+m.user.name+'] '+m.message

                this.chatChannel.push(show)
            })
    }

}
