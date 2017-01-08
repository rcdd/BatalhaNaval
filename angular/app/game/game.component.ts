import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { AuthService, AlertService } from '../_services/index';
import { Board } from '../board/index';
import { ShipType, Orientation } from '../board/ship';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

const URL_GAME = '/api/v1/games';
const MAX_PLAYERS = 4;

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
  idGame: any;
  typeSubmit: any;
  private sub: any;
  listBoardsInGame: any = [];

  allDataFromServer: any = [];

  newGameDash: boolean = false;
  headers = new Headers();

  constructor(private websocketsService: WebSocketService, private authService: AuthService,
    private alertService: AlertService, private http: Http, private _router: Router, private route: ActivatedRoute) {

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idGame = params['id'];
      this.typeSubmit = params['type'];
      console.log(this.idGame);
      if (this.typeSubmit === 'join') {
        this.joinGameDashForm();
      } else if (this.typeSubmit === 'start') {
        this.start();
      } else if (this.typeSubmit === 'play') {
        this.play();
      }
      this.websocketsService.getShoot(this.idGame).subscribe((data) => {
        console.dir(data);
        /* if (data.owner === this.authService.user._id) {
           let celltype: any = this.boards[0].cells[data.position].type;
           console.log(celltype);
         }*/
      });

    });
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
    this.selectedOrientation = 0;
    this.selectedShipSelector = 0;
    this.selectedShip = this.listShip[this.selectedShipSelector];
  }

  joinGameDashForm() {
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
    this.selectedOrientation = 0;
    this.selectedShipSelector = 0;
    this.selectedShip = this.listShip[this.selectedShipSelector];
    console.dir(this.listShip);
  }

  onSelectedChange() {
    this.selectedShip = this.listShip[this.selectedShipSelector];
  }

  newGame() {
    if (this.listShip.length === 0) {
      this.alertService.subject.next();

      this.newBoard.owner = this.authService.user._id;
      let body = {
        id: Math.floor(Math.random() * 99999) + 1,
        players: [{ player: this.authService.user, board: this.newBoard }],
        creator: this.authService.user._id,
        state: 'created'
      };

      console.dir(this.newBoard);
      console.dir(body);

      this.http.post(URL_GAME, JSON.stringify(body), {
        headers: this.headers
      })
        .subscribe(data => {
          this.alertService.success('Your game # is: ' + body.id);
          this.newGameDash = false;
          this.websocketsService.sendLists();
          this._router.navigate(['home']);
        }, error => {
          this.alertService.error('unauthorized!');
          console.log(JSON.stringify(error.json()));
        });
    } else {
      this.alertService.error('You need to insert all ships!');
    }
  }

  joinGame() {
    let game: any = [];
    // GETING GAME
    let endpoint = URL_GAME + '/' + this.idGame;
    this.http.get(endpoint, {
      headers: this.headers
    }).map(res => res.json()).subscribe(data => {
      game = data;

      // CHECK CONFIGURATION
      this.newBoard.owner = this.authService.user._id;
      game.players.push({ 'player': this.authService.user, 'board': this.newBoard });

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
            this.alertService.success('You join in game #: ' + game.id, true);
            this.websocketsService.sendLists();
            this.websocketsService.getBoardsGame(game._id).subscribe(
              m => {
                console.log('a receber boards');
                console.dir(m);
                this.allDataFromServer = m;
              });
            this._router.navigate(['/home']);
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
    this.websocketsService.sendLists();
  }


  play() {
    let boards: any = [];
    this.allDataFromServer.listBoardInGame.forEach((boardInGame: any) => {
      if (this.allDataFromServer.listBoardInGame.owner === this.authService.user._id) {
        boards.push(boardInGame);
      }
    });

    this.allDataFromServer.listBoardsToShoot.forEach((boardToShoot: any) => {
      if (this.allDataFromServer.listBoardsToShoot.owner !== this.authService.user._id) {
        boards.push(boardToShoot);
      }
    });

    this.boards = boards;
  }

  start() {
    let game: any = [];
    // let listBoardsInGame: any = [];
    let endpoint = URL_GAME + '/' + this.idGame;
    this.http.get(endpoint, {
      headers: this.headers
    }).map(res => res.json()).subscribe(data => {
      game = data;
      game.players.forEach((players: any) => {
        this.listBoardsInGame.push(players.board);
      });

      game.state = 'playing';
      this.http.put(endpoint, game, {
        headers: this.headers
      })
        .subscribe(ok => {
          // JOIN GAME => TODO
          this.websocketsService.sendLists();
          this.websocketsService.createGame(game._id, this.listBoardsInGame);
          let boards: any = [];
          boards.push(this.listBoardsInGame[0]);

          for (let i: any = 1; i < this.listBoardsInGame.length; i++) {
            let bd: any = [];
            bd = new Board();
            bd.owner = this.listBoardsInGame[i].owner;
            boards.push(bd);
            console.dir(bd);
          }
          this.boards = boards;
        }, error => {
          this.alertService.error('error assign to game!');
          console.log(JSON.stringify(error.json()));
        });
    });
  }

  getShoot(id: any) {
    console.dir(' GAME COMPONENT: ' + id);
  }
}
