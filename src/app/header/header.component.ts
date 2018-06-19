import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styles: [`
      header .brand-logo {
          margin-left: 20px;
          margin-top: -35px;
      }
      nav .brand-logo {
          position: absolute;
          color: #fff;
          display: inline-block;
          font-size: 2.1rem;
          padding: 0;
          white-space: nowrap;
          height: 0px;
      }
      .navbar-fixed {
        z-index: 1000;
      }
    `]
})
export class HeaderComponent implements  OnInit {

    ngOnInit() {
    }
}
