import { Uploader } from '../_directives/uploader';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { AlertService, AlbumService } from '../_services/index';
import { User } from '../_models/index';
import { MyUploadItem }  from './my-upload-item';

@Component({
    templateUrl: 'file-create.component.html',
    styles: []
})

export class SongCreateComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: User;

    @ViewChild('doc') doc;

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
        // let uploadFile = (<HTMLInputElement>window.document.getElementById('file')).files[0];
        // console.log(uploadFile);
        // console.log(txt);

        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (this.currentUser) {
        //     console.log(this.currentUser.user.username);
        // }
        //
        // let fileBrowser = this.file.nativeElement;
        // if (fileBrowser.files && fileBrowser.files[0]) {
        //   const formData = new FormData();
        //   formData.append("files", fileBrowser.files[0], fileBrowser.files[0].name);
        //
        //   console.log(formData);
        //
        //   this.fileService.create(this.model).subscribe(res => {
        //   //   // do stuff w/my uploaded file
        //   });
        // }

        let uploadFile = (<HTMLInputElement>window.document.getElementById('doc')).files[0];

        let myUploadItem = new MyUploadItem(uploadFile);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        myUploadItem.formData = { user_id: currentUser.user.id, doc: myUploadItem.file };  // (optional) form data can be sent with file

        console.log(myUploadItem);
        this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
          console.log(response);
          alert('File uploaded successfully');
          this.router.navigate(['/file-uploads']);

        };
        this.uploaderService.onErrorUpload = (item, response, status, headers) => {
             console.log(response);
             alert(response);
        };
        this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
             // complete callback, called regardless of success or failure
        };
        this.uploaderService.upload(myUploadItem);
    }
}
