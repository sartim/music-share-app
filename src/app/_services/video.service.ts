import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';
import { Video } from '../_models';

@Injectable()
export class VideoService {

    constructor(private http: Http, private userService: UserService, ) { }

    getAllVideos(offset: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/video/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getVideoById(id: number) {
        return this.http.get('https://promoh.herokuapp.com/api/v1/video/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    create(video: Video) {
        let body = video;
        console.log(body);
        let headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'JWT '+this.userService.token()
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('https://promoh.herokuapp.com/api/v1/video/', body, options).map((response: Response) => response.json());
    }

    update(video: Video) {
        return this.http.put('https://promoh.herokuapp.com/api/v1/video/' + video.id, video, this.userService.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('https://promoh.herokuapp.com/api/v1/file/' + id, this.userService.jwt()).map((response: Response) => response.json());
    }
}
