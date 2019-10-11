import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import{FormsModule,ReactiveFormsModule }from '@angular/forms';
import{AngularFireModule}from '@angular/fire';
import{AngularFireAuthModule }from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import{UsersService} from './users/users.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ExamComponent } from './exam/exam.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { UserDetailsComponent} from './users/user-details/user-details.component';
// import social login
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { EditUserComponent } from './users/edit-user/edit-user.component';
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("768398157967-tnj223b35dh456748093ekr9jl2kckqf.apps.googleusercontent.com")
   },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("395320337828888")
  }
]);
 
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FeedbackComponent,
    ExamComponent,
    CreateUsersComponent,
    UserDetailsComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule ,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'my-app-name'), 
    AngularFireDatabaseModule,
    AngularFireAuthModule ,
    SocialLoginModule,
    RouterModule.forRoot([ 
      { path: '', 	component: HomeComponent }, 
      {path: 'contact', component:ContactComponent},
      {path: 'about', component:AboutComponent},
      {path: 'feedback', component:FeedbackComponent},
      {path: 'signup', component:CreateUsersComponent},
      { path: 'exam/:subjectId', component: ExamComponent },
      {path : 'account',component:UserDetailsComponent},
      {path : 'editUser', component: EditUserComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' },
     
     ]) 
    
  ],
  providers: [UsersService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
