import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';

import { NotificationModule } from './notifications/notifications.module';
import {ChatComponent} from './chat.component';
import { WebSocketService } from './notifications/websocket.service';

import { AuthService } from './auth.service';

@NgModule({
  imports:      [ BrowserModule, NotificationModule, FormsModule ],
  declarations: [ AppComponent, ChatComponent ],
  providers:    [ WebSocketService, AuthService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
