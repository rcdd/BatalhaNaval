import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { AuthService, AlertService } from '../_services/index';
import { Board } from '../board/index';
import { ShipType, Orientation } from '../board/ship';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

const URL_GAME_WAITING = 'http://localhost:8080/api/v1/games/waiting';
const URL_NEW_GAME = 'http://localhost:8080/api/v1/games';
const URL_GAME = 'http://localhost:8080/api/v1/games/';

@Component({
  moduleId: module.id,
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  boards: any = [];
  newBoard: any = [];
  selectedShip: any;
  selectedShipSelector: any;
  listShip: any = [];
  selectedOrientation: any;
  listOrientation: any = [];

  form: any = {};
  listGames: any = '';
  newGameDash: boolean = false;
  headers = new Headers();

  constructor(private websocketsService: WebSocketService, private authService: AuthService,
    private alertService: AlertService, private http: Http) {

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);
    this.updateGameList();

  }

  ngOnInit() {
    this.websocketsService.getBoard().subscribe(data => {
      this.boards = data;
    });
  }

  updateGameList() {
    let endpoint = URL_GAME_WAITING;
    this.http.get(endpoint, {
      headers: this.headers
    }).map(res => res.json()).subscribe(a => {
      this.listGames = a;
    });
  }

  joinGame(id: number) {
    let game: any = [];

    // GETING GAME
    let endpoint = URL_GAME + id;
    this.http.get(endpoint, {
      headers: this.headers
    }).map(res => res.json()).subscribe(data => {
      game = data;

      // CHECK CONFIGURATION
      game.players.push(this.authService.user);

      if (game.players.length === game.maxPlayers) {
        game.state = 'playing';
      }

      if (game.players.length <= game.maxPlayers) {
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

  newGameDashForm() {
    this.newGameDash = true;
    this.newBoard = new Board();
    this.listShip = [];
    this.listOrientation = [];
    this.listShip.push({ name: 'PortaAvioes', value: ShipType.PortaAvioes, id: 0 });
    this.listShip.push({ name: 'Couracado', value: ShipType.Couracado, id: 1 });
    this.listShip.push({ name: 'Cruzador', value: ShipType.Cruzador, id: 2 });
    this.listShip.push({ name: 'Cruzador', value: ShipType.Cruzador, id: 3 });
    this.listShip.push({ name: 'ContraTorpedeiro', value: ShipType.ContraTorpedeiro, id: 4 });
    this.listShip.push({ name: 'ContraTorpedeiro', value: ShipType.ContraTorpedeiro, id: 5 });
    this.listShip.push({ name: 'ContraTorpedeiro', value: ShipType.ContraTorpedeiro, id: 6 });
    this.listShip.push({ name: 'Submarino', value: ShipType.Submarino, id: 7 });
    this.listShip.push({ name: 'Submarino', value: ShipType.Submarino, id: 8 });
    this.listShip.push({ name: 'Submarino', value: ShipType.Submarino, id: 8 });
    this.listShip.push({ name: 'Submarino', value: ShipType.Submarino, id: 10 });
    this.listOrientation.push({ name: 'Normal', value: Orientation.Normal });
    this.listOrientation.push({ name: 'Roda90', value: Orientation.Roda90 });
    this.listOrientation.push({ name: 'Roda180', value: Orientation.Roda180 });
    this.listOrientation.push({ name: 'Roda270', value: Orientation.Roda270 });

  }

  onSelectedChange() {
    this.selectedShip = this.listShip[this.selectedShipSelector];
  }

  newGame() {
    console.log('Form Object');
    console.dir(this.form);
    if (this.form.numMax < 2 || this.form.numMax > 4) {
      this.alertService.error('Error in number of players. Please insert between 2 to 4.');
    } else {
      this.alertService.subject.next();
      let endpoint = URL_NEW_GAME;
      let body = {
        id: Math.floor(Math.random() * 99999) + 1,
        players: [this.authService.user],
        maxPlayers: this.form.numMax,
        state: 'waiting'
      };

      this.http.post(endpoint, body, {
        headers: this.headers
      })
        .subscribe(data => {
          this.alertService.success('Your game # is: ' + body.id);
          for (let i = 0; i < this.form.numMax; i++) {
            this.boards.push(new Board());
          }
          console.dir(this.boards);
          this.websocketsService.sendBoard(this.boards);
        }, error => {
          this.alertService.error('unauthorized!');
          console.log(JSON.stringify(error.json()));
        });
    }
  }
}
