import { Component, OnInit } from '@angular/core';
import {Song} from "../_models";
import {SongService} from "../_services";

@Component({
    templateUrl: 'song-list.component.html',
    styles: []
})

export class SongListComponent implements OnInit {
    songs: Song[] = [];

    model: any = {};
    loading = false;

    private f = 0;

    constructor(
        private songService: SongService) { }

    ngOnInit() {
      this.loadAllSongs(0);
    }

    download(doc: string) {
      window.location.href = doc;
    }

    pageOffset() {
      const inc_offset = this.f += 50;
      this.loadAllSongs(inc_offset);
    }

    private loadAllSongs(offset) {
      const load_all_ = this.songService.getAllSongs(offset);
      load_all_.subscribe(songs => { this.songs = songs; });
    }
}
