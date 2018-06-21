import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services';
import {ToastController} from "ionic-angular";
import {User} from "../_models";

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    user: User[] = []

    constructor(
        private router: Router,
        private userService: UserService,
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

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    this.router.navigate(['/login']);
                    this.presentToast("You have been successfully registered")
                },
                error => {
                    this.presentToast("User has already been registered");
                    this.loading = false;
                });
    }
}
