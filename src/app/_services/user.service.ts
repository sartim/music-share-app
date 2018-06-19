import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    create(user: User) {
        return this.http.post('https://calm-oasis-69563.herokuapp.com/api/v1/auth/register/', user, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    token() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser.token;
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
