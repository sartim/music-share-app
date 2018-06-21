import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';
import { Album } from '../_models/index';

@Injectable()
export class AlbumService {

    constructor(private http: Http, private userService: UserService, ) { }

    getAllAlbums(user_id: number, offset: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/album/user/'+ user_id +'/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getAllAlbumSongs(id: number, user_id: number, offset: number) {
      return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + id + '/user/'+ user_id + '/song/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getAllAlbumVideos(id: number, user_id: number, offset: number) {
      return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + id + '/user/'+ user_id +'/video/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getAlbumById(id: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/album/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    create(album: Album) {
        let body = album;
        console.log(body);
        let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'JWT '+this.userService.token()
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('https://promoh.herokuapp.com/api/v1/album/', body, options)
          .map((response: Response) => response.json());
    }

    update(album: Album) {
        return this.http.put('https://promoh.herokuapp.com/api/v1/album/' + album.id, album,
          this.userService.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('https://promoh.herokuapp.com/api/v1/album/' + id + '/', this.userService.jwt())
          .map((response: Response) => response.json());
    }
}
