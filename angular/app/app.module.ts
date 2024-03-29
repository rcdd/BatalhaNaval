import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';

import { ChatComponent } from './chat/index';
import { WebSocketService } from './_services/websocket.service';
import { AlertService, AuthService } from './_services/index';
import { ChatService } from './_services/chat.service';

import { AlertComponent } from './_alert/index';
import { GameComponent } from './game/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponentModule } from './board/board.module';

import { AuthGuard } from './_guard/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TopTenComponent } from './topten/index';
import { HomeComponent } from './home/index';
import { ListGamesComponent } from './listGames/index';
import { AccountComponent } from './account/account.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    BoardComponentModule,
    HttpModule,
    routing

  ],
  declarations: [
    AppComponent,
    ChatComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    TopTenComponent,
    ListGamesComponent,
    HomeComponent,
    AccountComponent
  ],
  providers: [
    WebSocketService,
    AuthGuard,
    AuthService,
    AlertService,
    ChatService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
