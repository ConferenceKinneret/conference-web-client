import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// form module
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// routes
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BuildConferenceComponent } from './components/build-conference/build-conference.component';
import { ShowConferenceComponent } from './components/show-conference/show-conference.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// http
import { HttpClientModule } from '@angular/common/http';
import { EditConferenceComponent } from './components/edit-conference/edit-conference.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BuildConferenceComponent,
    ShowConferenceComponent,
    ContactUsComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditConferenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
