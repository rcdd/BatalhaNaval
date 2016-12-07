import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    user: any;

    constructor(private http: Http) { }

    login(username: string, password: string): Observable<any> {
        let data = {
            username: username,
            password: password
        };
        return this.http.post(`/api/v1/login`, data)
        .map( (results) => {
            this.user = results.json();
            // console.log(this.user);
            return results.json();
        });
    }

    create(data: any): Observable<any> {
        
        return this.http.post(`/api/v1/players`, data)
        .map( (results) => {
            this.user = results.json();
            return results.json();
        });
    }

    logout() {
        return this.http.post(`/api/v1/logout`, '')
        .map( (results) => {
            this.user = results.json();
            return results.json();
        });
    }
}
