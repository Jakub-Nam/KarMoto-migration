import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule, NgForm } from '@angular/forms';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './user.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    PasswordStrengthMeterModule,
    PlaceholderDirective
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;

  adminInterface = false;
  error = '';
  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hidePassword = true;
  hideSpinner = true;
  message = '';
  passwordStrengthmeter: any;
  registrationView = false;

  private closeSub!: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  public togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password)
      .then(async userCredential => {
        let token = '';
        let date: Date =
          await userCredential.user.getIdTokenResult().then(
            (response: { token: string; }) => token = response.token
          );

        await userCredential.user.getIdTokenResult().then(
          (response: { expirationTime: Date; }) => date = response.expirationTime
        );

        const user = new User(
          userCredential.user.email,
          password,
          userCredential.user.uid,
          token,
          date
        );

        this.authService.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/']);
      })


      .catch(error => {
        this.message = 'Niepoprawne dane';
        this.showErrorAlert(this.message);
      });

    form.reset();
  }
  public onSwitchMode(form: NgForm) {
    this.registrationView = true;
  }
  public showRegistrationView() {
    this.registrationView = true;
  }
  public onHandleError() {
    this.message = '';
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.alertHost.viewContainerRef.createComponent(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    alertCmpFactory.instance.message = message;

    this.closeSub = alertCmpFactory.instance.closeMessage.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
