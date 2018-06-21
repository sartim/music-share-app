import { Uploader } from '../_directives/uploader';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AlbumService } from '../_services';
import { User } from '../_models';
import { MyUploadItem }  from './my-upload-item';
import {ToastController} from "ionic-angular";


@Component({
    templateUrl: 'album-song-create.component.html',
    styles: []
})

export class AlbumSongCreateComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: User;

    @ViewChild('audio_file') audio_file;

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

      let url = String(window.location);
      let cast_id = parseInt(url.slice(-1));
      let count = 1;
      let arr = [];
      while (!isNaN(cast_id)) {
        console.log(parseInt(url.slice(-count)));
        count++;
        if (isNaN(parseInt(url.slice(-count)))) {
          let new_count = count-1;
          arr.push(parseInt(url.slice(-new_count)));
          break;
        }
      }

      let uploadFile = (<HTMLInputElement>window.document.getElementById('audio_file')).files[0];
      let myUploadItem = new MyUploadItem(uploadFile, 'https://promoh.herokuapp.com/api/v1/song/');
        myUploadItem.formData = {
          album_id: arr[0],
          audio_file: myUploadItem.file,
          song_title: this.model.song_title

        };
        this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
          this.router.navigate(['/album-detail/'+arr[0]]);
          this.presentToast('Song added successfully');
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
