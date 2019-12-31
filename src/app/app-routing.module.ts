import {RouterModule,Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {NbConfigComponent} from './nbConfig/nbConfig.component';
import { AuthGuard } from './auth/auth.guard';
import { AllNbConfigComponent } from './nbConfig/all-nbConfig/all-nbConfig.component';
import { NewNbConfigComponent } from './nbConfig/new-nbConfig/new-nbConfig.component';
import { EditNbConfigComponent } from './nbConfig/edit-nb-config/edit-nb-config.component';

const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'nbConfig', component: NbConfigComponent, canActivate: [AuthGuard]},
    {path: 'allConfig', component: AllNbConfigComponent, canActivate: [AuthGuard]},
    {path: 'editConfig', component: EditNbConfigComponent, canActivate: [AuthGuard]},
    {path: 'newConfig', component: NewNbConfigComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
