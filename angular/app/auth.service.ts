import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    user:any
    
    constructor(private http:Http) { }

    login(username:string, password:string):Observable<any>{
        let data = {
            username: username,
            password: password
        }
        return this.http.post('http://localhost:8080/api/v1/login',data)
            .map( (results) => {
                this.user = results.json();
                return results.json()
            });
    }


}