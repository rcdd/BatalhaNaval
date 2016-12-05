import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';

import { NotificationModule } from './notifications/notifications.module';
import {ChatComponent} from './chat.component';
import { WebSocketService } from './notifications/websocket.service';
import { BoardPanelModule } from './board/board.module';
import { AuthService } from './auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [NgbModule.forRoot(), BrowserModule, NotificationModule, FormsModule, BoardPanelModule],
  declarations: [ AppComponent, ChatComponent ],
  providers:    [ WebSocketService, AuthService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
