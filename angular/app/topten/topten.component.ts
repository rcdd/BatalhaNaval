import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { AlertService, AuthService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'topTen',
    templateUrl: 'topten.component.html'
})

export class TopTenComponent {
    topten: any;

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private http: Http) {

        let endpoint = 'http://localhost:8080/api/v1/top10';
        this.http.get(endpoint).map(res => res.json()).subscribe(a => {
            this.topten = a;
        });

    }

}
