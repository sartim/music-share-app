import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/index';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {

    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
