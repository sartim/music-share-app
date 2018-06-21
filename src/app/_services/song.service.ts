import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';

import { Song } from '../_models';

@Injectable()
export class SongService {

    constructor(private http: Http, private userService: UserService, ) { }

    getAllSongs(offset: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/song/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getSongById(id: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    create(song: Song) {
        let body = song;
        console.log(body);
        let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'JWT '+this.userService.token()
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('https://promoh.herokuapp.com/api/v1/file/', body, options).map((response: Response) => response.json());
    }

    update(song: Song) {
        return this.http.put('https://promoh.herokuapp.com/api/v1/song/' + song.id, song, this.userService.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('https://promoh.herokuapp.com/api/v1/song/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }
}
