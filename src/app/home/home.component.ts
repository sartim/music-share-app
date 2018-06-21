import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Album, User} from '../_models';

import { AuthenticationService, AlbumService } from '../_services';
import {ToastController} from "ionic-angular";
import { Platform, ActionSheetController } from 'ionic-angular';

@Component({
    templateUrl: 'home.component.html',
    styles: []
})


export class HomeComponent implements OnInit {
    currentUser: User;
    albums: Album[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private albumService: AlbumService,
        private router: Router,
        private toastCtrl: ToastController,
        public platform: Platform,
        public actionsheetCtrl: ActionSheetController) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            console.log(JSON.stringify(this.currentUser.user.username));
        } else {
          location.reload();
        }
    }

    ngOnInit() {
        this.authenticationService.getNewToken(); // To get new token

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.loadAlbums(this.currentUser.user.id, 0); // To get total orders
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

    private loadAlbums(user_id: number, offset: number) {
      this.albumService.getAllAlbums(user_id, offset).subscribe(
        albums => {
          this.albums = albums;
          if (albums.count == 0) {
            this.presentToast("No albums added");
          }
        },
        error => { console.log('Error #333'); });
    }

    submitShare(id: number) {
        let actionSheet = this.actionsheetCtrl.create({
        title: 'Albums',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          // {
          //   text: 'Delete',
          //   role: 'destructive',
          //   icon: !this.platform.is('ios') ? 'trash' : null,
          //   handler: () => {
          //     console.log('Delete clicked');
          //   }
          // },
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

    favorite(id: number) {
      this.presentToast("Added to favorites");
    }

    share(id) {
      this.submitShare(id);
    }

    listen(id: number) {
      this.router.navigate(['/album-detail', id]);
    }

    addAlbum() {
      this.router.navigate(['/album-create']);
    }

    openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        // {
        //   text: 'Delete',
        //   role: 'destructive',
        //   icon: !this.platform.is('ios') ? 'trash' : null,
        //   handler: () => {
        //     console.log('Delete clicked');
        //   }
        // },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        // {
        //   text: 'Play',
        //   icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
        //   handler: () => {
        //     console.log('Play clicked');
        //   }
        // },
        // {
        //   text: 'Favorite',
        //   icon: !this.platform.is('ios') ? 'heart-outline' : null,
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },
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
}
