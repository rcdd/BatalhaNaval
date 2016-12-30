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
}
