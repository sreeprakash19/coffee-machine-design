import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms';
import {ProgressBarModule} from 'angular-progress-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config = {
  production: true,
  firebase: {
  apiKey: "AIzaSyDvlz8xYW9hqdZoJERnQJmhEqO1cqqLjkM",
  authDomain: "predictions-3c7df.firebaseapp.com",
  databaseURL: "https://predictions-3c7df.firebaseio.com",
  projectId: "predictions-3c7df",
  storageBucket: "predictions-3c7df.appspot.com",
  messagingSenderId: "506718456318",
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ProgressBarModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
