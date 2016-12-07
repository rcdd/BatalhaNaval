import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { HttpModule } from '@angular/http';

import { NotificationModule } from './notifications/notifications.module';
import { ChatComponent } from './chat/index';
import { WebSocketService } from './notifications/websocket.service';
import { BoardComponentModule } from './board/board.module';
import { AlertService, AuthService } from './_services/index';

import { AlertComponent } from './_alert/index';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './_guard/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    NgbModule.forRoot(), 
    BrowserModule, 
    NotificationModule, 
    FormsModule, 
    BoardComponentModule,
    HttpModule,
    routing
  ],
  declarations: [ 
    AppComponent, 
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HomeComponent
  ],
  providers:    [ 
    WebSocketService, 
    AuthGuard,
    AuthService,
    AlertService,
    {provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
