import { BrowserModule } from '@angular/platform-browser';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Uploader } from './_directives/uploader';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertComponent } from './_directives';
import {MyApp} from './app.component';
import { AuthGuard } from './_guards';
import { HomePage } from '../pages/home/home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { HomeComponent } from './home';
import { NavigationComponent } from './navigation';
import { AlertService, AuthenticationService, UserService,
  AlbumService, SongService, VideoService } from './_services/';
import { AlbumListComponent, AlbumCreateComponent, AlbumDetailComponent, AlbumVideoCreateComponent,
  AlbumSongCreateComponent} from './album';
import { TabsComponent} from './tabs';
import { MusicControls } from '@ionic-native/music-controls';
import { ActionSheet} from '@ionic-native/action-sheet';
import {Popover} from "./popover";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlertComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlbumListComponent,
    AlbumCreateComponent,
    AlbumDetailComponent,
    AlbumVideoCreateComponent,
    AlbumSongCreateComponent,
    Popover,
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
    HomePage,
    Popover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    AlbumService,
    SongService,
    VideoService,
    Uploader,
    MusicControls,
    ActionSheet,
    AndroidFullScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
