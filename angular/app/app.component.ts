import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    public model: any = {};

    constructor(private authService: AuthService) { }

    ngOnInit() {
        console.log('teste');
        console.dir(this.authService.user);
        this.model = { name: 'no name', photo: 'http://img.faceyourmanga.com/mangatars/0/2/2797/large_3810.png' };
        console.log('teste2');
        console.dir(this.model);
    }

    isLogged(): boolean {
        if (this.authService.user !== '') {
            return true;
        }
        console.log('nao desenha');
        return false;
    }

    getName(): string {
        if (this.authService.user) {

            return this.authService.user.username;
        }
        return '';
    }
    getPhoto(): string {
        if (this.authService.user) {
            return this.authService.user.photo;
        }
        return 'http://img.faceyourmanga.com/mangatars/0/2/2797/large_3810.png';
    }
}
