/// <reference types="@angular/localize" />

import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environment/environment';
import { importProvidersFrom } from '@angular/core';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
// import { VehiclesRoutingModule } from './app/vehicles/vehicles-routing.module';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      PasswordStrengthMeterModule.forRoot(),
      AppRoutingModule,
      // VehiclesRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase()),
    )
  ],
})
