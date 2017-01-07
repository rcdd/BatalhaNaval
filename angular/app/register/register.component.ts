import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};

    loading = false;
    passwordMin3Chars = false;
    passwordNotEqual = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) { }

    register() {
        this.passwordMin3Chars = false;
        this.passwordNotEqual = false;
        if (this.model.passwordHash.length < 3) {
            this.passwordMin3Chars = true;
            return;
        }else if (this.model.passwordHashConfirmation !== this.model.passwordHash) {
            this.passwordNotEqual = true;
        }else {
            this.loading = true;
            this.model['totalVictories'] = 0;
            this.authService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
    }
}
