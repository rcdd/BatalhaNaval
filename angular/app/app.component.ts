import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    username: string;
    password: string;

    constructor(private authService: AuthService) {}

    loginClick() {
        this.authService.login(this.username, this.password)
        .subscribe(results => console.log(results));

    }
}
