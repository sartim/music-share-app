import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';

import { File } from '../_models/index';

@Injectable()
export class AlbumService {

    constructor(private http: Http, private userService: UserService, ) { }

    getAllFiles(offset: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getFileById(id: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    extractContent(id: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + id + '/extract/',
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getFileExtractById(id: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/file/extract/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    create(file: File) {
        let body = file;
        console.log(body);
        let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'JWT '+this.userService.token()
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('https://promoh.herokuapp.com/api/v1/file/', body, options).map((response: Response) => response.json());
    }

    update(file: File) {
        return this.http.put('https://promoh.herokuapp.com/api/v1/file/' + file.id, file, this.userService.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('https://promoh.herokuapp.com/api/v1/file/' + id, this.userService.jwt()).map((response: Response) => response.json());
    }
}
