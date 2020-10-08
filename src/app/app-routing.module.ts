import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { BuildConferenceComponent } from './components/build-conference/build-conference.component';
import { ShowConferenceComponent } from './components/show-conference/show-conference.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAuthGuard } from './auth/login-auth.guard'
import { EditConferenceComponent } from './components/edit-conference/edit-conference.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent, canActivate: [LoginAuthGuard]},
  {path:'build', component:BuildConferenceComponent, canActivate: [LoginAuthGuard]},
  {path:'show', component:ShowConferenceComponent, canActivate: [LoginAuthGuard]},
  {path:'contact',component:ContactUsComponent, canActivate: [LoginAuthGuard]},
  {path:'about',component:AboutComponent, canActivate: [LoginAuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'edit',component:EditConferenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
