import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {AlbumService, SongService} from '../_services';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {Album, Song, User, Video} from "../_models";
import {Platform, ActionSheetController, ToastController} from 'ionic-angular';
import { MyApp } from '../app.component';
import {Storage} from "@ionic/storage";


@Component({
    templateUrl: 'album-detail.component.html',
    styles: [`
      audio {
        min-width: 100px;
        max-width: 100%;
        width: 100%;
      }
      video {
        min-width: 150px;
        max-width: 100%;
        width: 100%;
      }
    `]
})
export class AlbumDetailComponent implements OnInit {
    albums: Album[] = [];
    songs: Song[] = [];
    videos: Video[] = [];
    currentUser: User;

    constructor(
        private albumService: AlbumService,
        private songService: SongService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private toastCtrl: ToastController,
        public platform: Platform,
        public actionsheetCtrl: ActionSheetController,
        private app: MyApp,
        private storage: Storage) { }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.albumService.getAlbumById(+params.get('id')))
        .subscribe(
          albums => this.albums = albums);

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

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.loadAlbumSongs(arr[0], this.currentUser.user.id, 0); // To get total songs
        this.loadAlbumVideos(arr[0], this.currentUser.user.id, 0); // To get total videos

        // set a key/value
        this.storage.set('age', '12');

        this.storage.remove('name').then((val) => {
          alert('Removed');
        });

        // Or to get a key/value pair
        this.storage.get('age').then((val) => {
          alert('Your age is '+ val);
        });

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

    private loadAlbumSongs(id: number, user_id: number, offset: number) {
      this.albumService.getAllAlbumSongs(id, user_id, offset).subscribe(
        songs => {
          this.songs = songs;
          if (songs.results == '') {
            this.presentToast("No uploads for audio songs");
          }

          },
        error => { console.log('Error #333'); }
        );
    }

    private loadAlbumVideos(id: number, user_id: number, offset: number) {
      this.albumService.getAllAlbumVideos(id, user_id, offset).subscribe(
        videos => {
          this.videos = videos;
          if (videos.results == '') {
            //this.presentToast("No video for video uploads");
          }

          },
        error => { console.log('Error #333'); }
        );
    }

    submitShare(id: number) {
        let actionSheet = this.actionsheetCtrl.create({
        title: 'Albums',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Share',
            icon: !this.platform.is('ios') ? 'share' : null,
            handler: () => {
              console.log('Share clicked');
              this.presentToast("Shared!")
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

    share(id) {
      this.submitShare(id);
    }

    addVideo(id: number) {
      this.router.navigate(['/add-video/'+id]);
    }

    addSong(id: number) {
      this.router.navigate(['/add-song/'+id]);
    }

    deleteAlbum(id: number) {
      let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
                console.log('Delete clicked');
                this.albumService.delete(id).subscribe(
                  albums => {
                      this.albums = albums;
                      this.presentToast("Album deleted");
                      this.router.navigate(['']);
                      },
                  error => { console.log('Error '+error); }
            );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
    }

    deleteSong(id: number) {
      let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
                console.log('Delete clicked');
                this.songService.delete(id).subscribe(
                  albums => {
                      this.albums = albums;
                      this.presentToast("Song deleted");
                      window.location.reload();
                      },
                  error => { console.log('Error '+error); }
            );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
    }

    goBack(): void {
        this.app.goBack();
    }
}
