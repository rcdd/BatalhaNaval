import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../_services/websocket.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];

    constructor(private websocketService: WebSocketService) {
    }

    ngOnInit() {
        this.websocketService.getPlayersMessages().subscribe(
            m => {
                // console.log(m);
                this.playersChannel.push(m);
            });
    }

}
