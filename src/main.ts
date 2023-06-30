/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environment/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      PasswordStrengthMeterModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase()),

    )
  ],
})

 //   AngularFireModule.initializeApp(environment.firebaseConfig),
  //   // provideAuth(() => getAuth()),
  //   // provideDatabase(() => getDatabase()),