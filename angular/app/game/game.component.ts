import { Component, OnInit, Input } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { AuthService, AlertService } from '../_services/index';
import { Board } from '../board/index';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  boards: any = [];
  listGames: any = '';
  @Input()
  numMax: number = 0;
  headers = new Headers();

  constructor(private websocketsService: WebSocketService, private authService: AuthService,
    private alertService: AlertService, private http: Http) {

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authService.user.token);


    let endpoint = 'http://localhost:8080/api/v1/games/waiting';
    this.http.get(endpoint, {
      headers: this.headers
    }).map(res => res.json()).subscribe(a => {
      this.listGames = a;
    });
  }

  ngOnInit() {
    this.websocketsService.getBoard().subscribe(data => {
      this.boards = data;
    });
  }

  // TODO
  joinGame(id: number) {
    alert('joining in ' + id);

  }


  newGame() {
    if (this.numMax < 2 || this.numMax > 4) {
      this.alertService.error('Error of number of players. Please insert between 2 to 4.');
    } else {
      this.alertService.subject.next();
      let endpoint = 'http://localhost:8080/api/v1/games';

      let body = {
        id: Math.floor(Math.random() * 9999) + 1,
        players: [{ user: this.authService.user }],
        maxPlayers: this.numMax,
        state: 'waiting'
      };

      this.http.post(endpoint, body, {
        headers: this.headers
      })
        .subscribe(data => {
          alert('Your game # is: ' + body.id);
          for (let i = 0; i < this.numMax; i++) {
            this.boards.push(new Board());
          }
          console.dir(this.boards);
          this.websocketsService.sendBoard(this.boards);
        }, error => {
          alert('unauthorized!');
          console.log(JSON.stringify(error.json()));
        });
    }
  }


}
