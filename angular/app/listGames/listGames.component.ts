import { Component } from '@angular/core';
import { AuthService, AlertService } from '../_services/index';
import { Http, Headers } from '@angular/http';

import { WebSocketService } from '../_services/websocket.service';

const URL_GAME = 'http://localhost:8080/api/v1/games';

@Component({
    moduleId: module.id,
    selector: 'listGames',
    templateUrl: 'listGames.component.html'
})

export class ListGamesComponent {
    currentUser: string;
    listGames: any = '';
    listGamesCreated: any = [];
    listGamesWaiting: any = [];
    listGamesFull: any = [];
    headers = new Headers();

    constructor(private authService: AuthService, private websocketsService: WebSocketService,
        private alertService: AlertService, private http: Http) {
        this.currentUser = this.authService.user;
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);
        this.updateGameList();
    }

    updateGameList() {
        this.listGamesCreated = [];
        this.listGamesWaiting = [];
        this.listGamesFull = [];

        this.http.get(URL_GAME, {
            headers: this.headers
        }).map(res => res.json()).subscribe(a => {
            this.listGames = a;
            if (this.listGames !== '') {
                this.listGames.forEach((game: any) => {
                    if (game.state === 'created') {
                        this.listGamesCreated.push(game);
                    } else if (game.state === 'waiting') {
                        this.listGamesWaiting.push(game);
                    } else if (game.state === 'full') {
                        if (game.players.indexOf(this.authService.user)) {

                            this.listGamesFull.push(game);
                        }
                    }
                });
            }
        });
    }


    joinGame(id: number) {
        this._router.navigate(['game/' + id]);
    }
}
