import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  template: `
    <ion-list inset>
      <button ion-item icon-start>
        <ion-icon ios="ios-person" md="md-person"></ion-icon>
        Profile
      </button>
      <button ion-item icon-start>
        <ion-icon name="settings"></ion-icon>
        Settings
      </button>
      <button ion-item [routerLink]="['/login']" icon-start>
        <ion-icon name="exit"></ion-icon>
        Logout
      </button>
    </ion-list>
  `
})
export class Popover {
  constructor(private navParams: NavParams) {}

  ngOnInit() {
    if (this.navParams.data) {
      //
    }
  }
}
