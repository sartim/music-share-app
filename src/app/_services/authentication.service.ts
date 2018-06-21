import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserService} from "./user.service";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private userService: UserService) { }

    login(username: string, password: string) {
        let body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let login = this.http.post('https://promoh.herokuapp.com/api/v1/auth/token-auth/', body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });

        return login
    }

    refresh() {
            let body = localStorage.getItem('currentUser');
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            let refresh = this.http.post('https://promoh.herokuapp.com/api/v1/auth/token-refresh/', body, options)
                .map((response: Response) =>
                {
                    // login successful if there's a jwt token in the response
                    let user = response.json();
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        console.log("updated token");
                    }
                    return user;
                });

            return refresh
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getNewTokenHandler(){
        setInterval(() => this.getNewToken(), 120000);
    }

    getNewToken() {
        if (localStorage.getItem('currentUser')){
            this.refresh().subscribe();
        } else {
            return false;
        }
    }

    verifyToken(token: object) {
      let body = token;
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+this.userService.token()
        });
        let options = new RequestOptions({ headers: headers });
        let request = this.http
          .post('https://promoh.herokuapp.com/api/v1/auth/token-verify/', body, options)
          .map((response: Response) => response.json());
      return request
    }
}
