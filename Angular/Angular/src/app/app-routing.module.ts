import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { LoginComponent } from './components/user-auth/login/login.component';
import { SignupComponent } from './components/user-auth/signup/signup.component';
import { HomeComponent } from './components/home/home/home.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
