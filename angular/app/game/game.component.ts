import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { AuthService, AlertService } from '../_services/index';
import { Board } from '../board/index';
import { ShipType, Orientation } from '../board/ship';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';

const URL_NEW_GAME = 'http://localhost:8080/api/v1/games';

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

  newGameDash: boolean = false;
  headers = new Headers();

  constructor(private websocketsService: WebSocketService, private authService: AuthService,
    private alertService: AlertService, private http: Http, private _router: Router) {

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);

  }

  ngOnInit() {
    /*this.websocketsService.getBoard().subscribe(data => {
      this.boards = data;
    });*/
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

  onSelectedChange() {
    this.selectedShip = this.listShip[this.selectedShipSelector];
  }

  newGame() {
    if (this.listShip.length === 0) {
      this.alertService.subject.next();

      let body = {
        id: Math.floor(Math.random() * 99999) + 1,
        players: [{player: this.authService.user, board: this.newBoard}],
        creator: this.authService.user._id,
        state: 'created'
      };

      console.dir(this.newBoard);
      console.dir(body);

      this.http.post(URL_NEW_GAME, JSON.stringify(body), {
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
}
