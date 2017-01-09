import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './_guard/index';
import { GameComponent } from './game/index';

// import { BoardComponent } from './board/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'game', component: GameComponent, canActivate: [AuthGuard]  },
    { path: 'game/:type/:id', component: GameComponent, canActivate: [AuthGuard]  },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
