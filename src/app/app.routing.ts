import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {
  AlbumListComponent, AlbumCreateComponent, AlbumDetailComponent,
  AlbumVideoCreateComponent, AlbumSongCreateComponent
} from './album';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'file-uploads', component: AlbumListComponent, canActivate: [AuthGuard]  },
    { path: 'album-create', component: AlbumCreateComponent, canActivate: [AuthGuard]  },
    { path: 'add-video/:id', component: AlbumVideoCreateComponent, canActivate: [AuthGuard]  },
    { path: 'add-song/:id', component: AlbumSongCreateComponent, canActivate: [AuthGuard]  },
    { path: 'album-detail/:id', component: AlbumDetailComponent, canActivate: [AuthGuard] },
    { path: 'album-detail/:id', component: AlbumDetailComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
