import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    create(user: User) {
        return this.http.post('https://promoh.herokuapp.com/api/v1/auth/register/', user,
          this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    token() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        let token = currentUser.token;
        return token;
      } else {
        let token = '';
        return token;
      }
    }

    jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
