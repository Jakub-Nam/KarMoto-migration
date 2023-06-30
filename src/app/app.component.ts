// import { AngularFireModule } from '@angular/fire/compat';
// import { AppRoutingModule } from './app-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
// import { Component } from '@angular/core';
// import { environment } from './../environment/environment';
// import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AppRoutingModule } from './app-routing.module';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
// import { environment } from './../environment/environment';
// import { FooterComponent } from './footer/footer.component';
// import { RouterLink } from '@angular/router';

import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const materialComponents = [
  MatSliderModule,
  MatButtonModule,
  MatInputModule
];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    materialComponents,
    NgbModule,
    RouterModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    // BrowserModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

}