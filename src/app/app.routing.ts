import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { AlbumListComponent, AlbumCreateComponent, AlbumDetailComponent } from './album/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'file-uploads', component: AlbumListComponent, canActivate: [AuthGuard]  },
    { path: 'file-create', component: AlbumCreateComponent, canActivate: [AuthGuard]  },
    { path: 'file-extract/:id', component: AlbumDetailComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
