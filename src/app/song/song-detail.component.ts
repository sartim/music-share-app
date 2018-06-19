import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlbumService } from '../_services/index';
import { Location } from '@angular/common';

@Component({
    templateUrl: 'file-detail.component.html'
})
export class SongDetailComponent implements OnInit {
    files: File[] = [];

    constructor(
        private fileService: AlbumService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.fileService.getFileExtractById(+params.get('id')))
        .subscribe(files => this.files = files);
    }

    private getDel(id) {
      this.fileService.getFileExtractById(id).subscribe(files => this.files = files);
    }

    goBack(): void {
        this.location.back();
    }
}
