import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    user: any;
    headers = new Headers();

    constructor(private http: Http) {
    }

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

    loginFacebook(): Observable<any> {
        return this.http.get(`/auth/facebook`)
        .map( (results) => {
            console.log('ola');
            console.log(results);
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

    update(data: any): Observable<any> {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + data.token);
        return this.http.put(`/api/v1/players/` + data._id, data, {
            headers: this.headers
        })
        .map( (results) => {
            this.user = results.json();
            return results.json();
        });
    }

    logout() {
        this.user = '';
        return this.http.post(`/api/v1/logout`, '')
        .map( (results) => {
            this.user = results.json();
            return results.json();
        });
    }

    recoverPassword(username: string): Observable<any> {
        let data = {
            username: username
        };
        return this.http.post(`/api/v1/recover`, data)
        .map( (results) => {
            this.user = results.json();
            return results.json();
        });
    }
}
