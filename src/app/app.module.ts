import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegisterComponent } from './register/register.component';
import { EditAccoountComponent } from './edit-account/edit-accoount.component';
import { ExamComponent } from './exam/exam.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FeedbackComponent,
    RegisterComponent,
    EditAccoountComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([ 
      { path: '', 	component: HomeComponent }, 
      {path: 'contact', component:ContactComponent},
      {path: 'about', component:AboutComponent},
      {path: 'feedback', component:FeedbackComponent},
      {path: 'signup', component:RegisterComponent},
      {path: 'editaccount', component:EditAccoountComponent},
      {path: 'exam', component:ExamComponent},
      { path: 'products/:productId', component: HomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
     
     ]) 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
