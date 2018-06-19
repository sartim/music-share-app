import { BrowserModule } from '@angular/platform-browser';
import { Uploader } from './_directives/uploader';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AlertComponent } from './_directives/index';
import { MyApp } from './app.component';
import { AuthGuard } from './_guards/index';
import { HomePage } from '../pages/home/home';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';

import { AlertService, AuthenticationService, UserService, AlbumService } from './_services/index';
import { AlbumListComponent, AlbumCreateComponent, AlbumDetailComponent } from './album/index';
import { TabsComponent} from './tabs/index';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlbumListComponent,
    AlbumCreateComponent,
    AlbumDetailComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    AlbumService,
    Uploader,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
