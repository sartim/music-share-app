import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SongService } from '../_services/index';
import { Location } from '@angular/common';
import {Song} from "../_models";

@Component({
    templateUrl: 'video-detail.component.html'
})
export class VideoDetailComponent implements OnInit {
    songs: Song[] = [];

    constructor(
        private fileService: SongService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.fileService.getSongById(+params.get('id')))
        .subscribe(songs => this.songs = songs);
    }

    goBack(): void {
        this.location.back();
    }
}
