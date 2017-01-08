import { Component, OnInit } from '@angular/core';
import { AuthService, AlertService } from '../_services/index';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { WebSocketService } from '../_services/websocket.service';

const URL_GAME = '/api/v1/games';

@Component({
    moduleId: module.id,
    selector: 'listGames',
    templateUrl: 'listGames.component.html'
})

export class ListGamesComponent implements OnInit {
    currentUser: string;
    listGames: any = '';
    listGamesCreated: any = [];
    listGamesWaiting: any = [];
    listGamesWaitingInGame: any = [];
    listGamesPlaying: any = [];
    listGamesFull: any = [];

    headers = new Headers();

    constructor(private authService: AuthService, private websocketsService: WebSocketService,
        private alertService: AlertService, private http: Http, private _router: Router) {
        this.currentUser = this.authService.user;
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);
        this.updateGameList();
    }


    ngOnInit() {
        // TODO: subscribe each type of event on websocketService
        // Every time a message is served 
        console.log('subscribe to updateList');
        this.websocketsService.getListAlert().subscribe(
            m => {
                console.log('new update by socket');
                this.updateGameList();
            });
    }

    updateGameList() {
        this.listGamesCreated = [''];
        this.listGamesWaiting = [''];
        this.listGamesFull = [''];
        this.listGamesPlaying = [''];
        this.listGamesWaitingInGame = [''];

        this.http.get(URL_GAME, {
            headers: this.headers
        }).map(res => res.json()).subscribe(a => {
            this.listGames = a;
            if (this.listGames !== '') {
                this.listGames.forEach((game: any) => {
                    if (game.state === 'created') {
                        this.listGamesCreated.push(game);
                    } else if (game.state === 'waiting') {
                        if ((game.creator !== this.authService.user._id) && game.players.indexOf(this.authService.user)) {
                            this.listGamesWaitingInGame.push(game);
                        } else {
                            this.listGamesWaiting.push(game);
                        }

                    } else if (game.state === 'playing') {
                        if (game.players.indexOf(this.authService.user)) {
                            this.listGamesPlaying.push(game);
                        }
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
        this._router.navigate(['/game/' + id]);
    }
}
