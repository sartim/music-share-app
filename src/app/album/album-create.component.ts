import { Uploader } from '../_directives/uploader';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AlbumService } from '../_services';
import { User } from '../_models';
import { MyUploadItem }  from './my-upload-item';
import {ToastController} from "ionic-angular";


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
        private toastCtrl: ToastController) { }

    ngOnInit() {

    }

    presentToast(message: string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
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
}
