import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AlbumService } from '../_services/index';
import {User} from "../_models";

@Component({
    templateUrl: 'album-list.component.html',
    styles: []
})

export class AlbumListComponent implements OnInit {
    files: File[] = [];
    currentUser: User;
    model: any = {};
    loading = false;

    private f = 0;

    constructor(
        private router: Router,
        private fileService: AlbumService) { }

    ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.loadAllFiles(this.currentUser.user.id, 0);
    }

    download(doc: string) {
      window.location.href = doc;
    }

    pageOffset() {
      const inc_offset = this.f += 50;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.loadAllFiles(this.currentUser.user.id, inc_offset);
    }

    private loadAllFiles(user_id: number, offset: number) {
      const load_all_ = this.fileService.getAllAlbums(user_id, offset);
      load_all_.subscribe(files => { this.files = files; });
    }
}
