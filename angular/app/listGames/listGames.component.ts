import { Component, OnInit } from '@angular/core';
import { AuthService, AlertService } from '../_services/index';
import { Http, Headers } from '@angular/http';

import { WebSocketService } from '../_services/websocket.service';

const URL_GAME = 'http://localhost:8080/api/v1/games';
const MAX_PLAYERS = 4;

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
    listGamesFull: any = [];
    headers = new Headers();

    constructor(private authService: AuthService, private websocketsService: WebSocketService,
        private alertService: AlertService, private http: Http) {
        this.currentUser = this.authService.user;
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);
        this.updateGameList();
    }


    ngOnInit() {
        // TODO: subscribe each type of event on websocketService
        // Every time a message is served 
        this.websocketsService.getListAlert().subscribe(
            m => {
                console.log('new update by socket');
                this.updateGameList();
            });
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
        let game: any = [];

        // GETING GAME
        let endpoint = URL_GAME + '/' + id;
        this.http.get(endpoint, {
            headers: this.headers
        }).map(res => res.json()).subscribe(data => {
            game = data;

            // CHECK CONFIGURATION
            game.players.push(this.authService.user);

            if (game.state === 'created') {
                game.state = 'waiting';
            }
            if (game.state === 'waiting' && game.players.length === MAX_PLAYERS) {
                game.state = 'full';
            }
            if (game.state === 'waiting' && game.players.length !== MAX_PLAYERS) {

            }
            if (game.players.length < MAX_PLAYERS) {
                // UPDATE GAME
                this.http.put(endpoint, game, {
                    headers: this.headers
                })
                    .subscribe(ok => {
                        // JOIN GAME => TODO
                        this.alertService.success('You join in game #: ' + game.id);
                        this.updateGameList();

                    }, error => {
                        this.alertService.error('error assign to game!');
                        console.log(JSON.stringify(error.json()));
                    });

            } else {
                this.alertService.error('Game is Full!');
            }
        }, error => {
            this.alertService.error('error getting game!');
            console.log(JSON.stringify(error.json()));
        });

        this.updateGameList();
    }
}
