import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArtcommentComponent } from './artcomment/artcomment.component';
import { AddarticleComponent } from './addarticle/addarticle.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UloginComponent } from './ulogin/ulogin.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { IndexComponent } from './index/index.component';

const routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'addarticle', component: AddarticleComponent },
  { path: 'artcomment', component: ArtcommentComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'ulogin', component: UloginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ArtcommentComponent,
    AddarticleComponent,
    AdduserComponent,
    UloginComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
