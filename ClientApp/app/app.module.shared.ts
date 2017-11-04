import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailsComponent } from './components/gamedetails/game-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { GameAddComponent} from './components/gameadd/gameadd.component';
import { AuthGuard } from './components/_guard/auth.guard';
import { AuthenticationService } from './components/_services/authentication.service';
import { RegistrationService } from './components/_services/registration.service';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LoginComponent,
        GamesComponent,
        GameDetailsComponent,
        RegisterComponent,
        GameAddComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
            { path: 'login', component: LoginComponent },
            { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
            { path: 'game-details/:id', component: GameDetailsComponent },
            { path: 'gameadd/:id', component: GameAddComponent },
            { path: 'register', component: RegisterComponent},
            { path: '**', redirectTo: 'home' }
			
        ])
    ],
    providers: [AuthGuard, AuthenticationService, RegistrationService]
    
})
export class AppModuleShared {
}
