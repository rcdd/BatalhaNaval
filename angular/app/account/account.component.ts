import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthService } from '../_services/index';


@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent {
    public model: any = {};

    loading = false;
    passwordMin3Chars = false;
    passwordNotEqual = false;


    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) {
        this.model = this.authService.user;
        this.model.passwordHash = '';
    }

    update() {
        console.log(this.model.name);
        console.dir(this.model);
        this.passwordMin3Chars = false;
        this.passwordNotEqual = false;
        if (this.model.passwordHash.length < 3) {
            this.passwordMin3Chars = true;
            return;
        }else if (this.model.name.length < 3) {
            console.log('no min');
        }else if (this.model.passwordHashConfirmation !== this.model.passwordHash) {
            this.passwordNotEqual = true;
        }else {
            this.loading = true;
            this.model.username = this.authService.user.username;
            console.log('olahaaaaa');
            this.authService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                },
                error => {
                    this.alertService.error(error._body.replace(/"/g, ''));
                    this.loading = false;
                });
        }
    }

}
