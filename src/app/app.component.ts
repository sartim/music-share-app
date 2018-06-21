import {Component, OnInit} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {AuthenticationService} from "./_services";
import {UserService} from "./_services";
import {User} from "./_models";
import { ToastController } from 'ionic-angular';
import {Router} from "@angular/router";
import { AndroidFullScreen } from '@ionic-native/android-full-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage:any = HomePage;
  user: User[] = [];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController,
              private router: Router,
              private androidFullScreen: AndroidFullScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.hide();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));
    let token_obj = {token: ""};
    token_obj['token'] = this.userService.token();
    if (token_obj.token) {
      this.authenticationService.verifyToken(token_obj).subscribe(
        user => {
          this.user = user;
          if (user.non_field_errors) {
            this.presentToast("Your session has expired");
            this.router.navigate(['/login']);
          } else if (user.token) {
            console.log("Token still active");
          }
        },
        error => {
          console.log('Error #333');
      });
    }
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
}

