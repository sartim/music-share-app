import { Uploader } from '../_directives/uploader';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { AlertService, AlbumService } from '../_services/index';
import { User } from '../_models/index';

@Component({
    templateUrl: 'album-create.component.html',
    styles: []
})

export class AlbumCreateComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private fileService: AlbumService,
        private alertService: AlertService,
        private http: Http,
        public uploaderService: Uploader) { }

    ngOnInit() {

    }

    delete_(id){
      this.fileService.delete(id).subscribe(
                data => {
                    this.alertService.success('File deleted successfully', true);
                    console.log(data);
                    this.router.navigate(['/file-uploads']);
                },
                error => {
                    this.alertService.error(error);
                    console.log(error);
                });
    }

    submit_() {

    }
}
