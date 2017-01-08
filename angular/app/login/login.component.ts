import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    recoverusernameEmpty = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) {

        this.model.username = 'admin';
        this.model.password = 'password';

    }

    ngOnInit() {
        this.authService.logout();
    }

    login() {
        this.loading = true;
        this.authService.login(this.model.username, this.model.password)
            .subscribe(data => {
                this.router.navigate(['/board']);
            },
            error => {
                this.alertService.error('Incorrect Login. Please try again.');
                this.loading = false;
            });

    }

    loginFacebook() {
        this.loading = true;
        this.authService.loginFacebook()
            .subscribe(data => {
                this.router.navigate(['/board']);
            },
            error => {
                this.alertService.error('Incorrect Login. Please try again.');
                this.loading = false;
            });

    }

    recoverPassword() {
        console.log(this.model.username);
        if (this.model.username === '') {
            this.recoverusernameEmpty = true;
            return;
        }
        this.loading = true;
        this.authService.recoverPassword(this.model.username)
            .subscribe(data => {
                this.alertService.success('Nova password enviada para o email' + data);
                this.loading = false;
            },
            error => {
                this.alertService.error('Ocorreu um erro');
                this.loading = false;
            });

    }
}
