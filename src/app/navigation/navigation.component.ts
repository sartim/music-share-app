import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';


@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    loggedUser: User;


    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            console.log(this.currentUser.user.username);
        }
    }
    ngOnInit() {
    }
}
