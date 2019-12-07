import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  {MainComponent} from './main/main.component'
import  {WelcomeComponent} from './welcome/welcome.component'
import  {LoginComponent} from './login/login.component'
import  {ProfileComponent} from './profile/profile.component'

export const routes: Routes = [{ path: '',component: WelcomeComponent},{path:'main', component:MainComponent},{path:'login',component:LoginComponent},{path:'profile',component:ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

