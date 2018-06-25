import { Uploader } from '../_directives/uploader';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AlbumService } from '../_services';
import { User } from '../_models';
import { MyUploadItem }  from './my-upload-item';
import {ToastController} from "ionic-angular";
import {MyApp} from "../app.component";


@Component({
    templateUrl: 'album-create.component.html',
    styles: []
})

export class AlbumCreateComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: User;

    @ViewChild('album_logo') album_logo;

    constructor(
        private router: Router,
        private fileService: AlbumService,
        private alertService: AlertService,
        public uploaderService: Uploader,
        private toastCtrl: ToastController,
        private app: MyApp) { }

    ngOnInit() {

    }

    presentToast(message: string) {
      this.app.presentToast(message);
    }

    submit_() {
      this.loading = true;

      let uploadFile = (<HTMLInputElement>window.document.getElementById('album_logo')).files[0];

      let myUploadItem = new MyUploadItem(uploadFile, 'https://promoh.herokuapp.com/api/v1/album/');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        myUploadItem.formData = {
          user_id: currentUser.user.id,
          album_logo: myUploadItem.file,
          album_title: this.model.album_title,
          artist: this.model.artist,
          genre: this.model.genre

        };
        this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
          this.presentToast('Album added successfully');
          this.router.navigate(['']);
        };
        this.uploaderService.onErrorUpload = (item, response, status, headers) => {
             this.presentToast(response);
             this.loading = false;
        };
        this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
             // complete callback, called regardless of success or failure
        };
        this.uploaderService.upload(myUploadItem);
    }

    goBack(): void {
        this.app.goBack();
    }
}
