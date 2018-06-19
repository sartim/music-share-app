import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AlbumService } from '../_services/index';

@Component({
    templateUrl: 'album-list.component.html',
    styles: []
})

export class AlbumListComponent implements OnInit {
    files: File[] = [];

    model: any = {};
    loading = false;

    private f = 0;

    constructor(
        private router: Router,
        private fileService: AlbumService,
        private alertService: AlertService) { }

    ngOnInit() {
      this.loadAllFiles(0);
    }

    download(doc: string) {
      window.location.href = doc;
    }

    pageOffset() {
      const inc_offset = this.f += 50;
      this.loadAllFiles(inc_offset);
    }

    private loadAllFiles(offset) {
      const load_all_ = this.fileService.getAllFiles(offset);
      load_all_.subscribe(files => { this.files = files; });
    }

    view_extract(id) {
      this.extractContent(id);
    }

    private extractContent(id: number) {
      const extract = this.fileService.extractContent(id);
      extract.subscribe(data => {
          if (data.success == true) {
            this.router.navigate(['/file-extract', id]);
          } else if (data.success == false){
            alert(JSON.stringify(data.detail));
          }
        },
        error => {
          alert(error);
        });
    }
}
