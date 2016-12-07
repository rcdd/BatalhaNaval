import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUser: string;

    constructor(private authService: AuthService) {
        this.currentUser = this.authService.user;
    }

}
