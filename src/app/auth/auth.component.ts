import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from './user.model';
// import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
// import { AlertComponent } from '../shared/alert/alert.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy {
  registrationView = false;
  hideSpinner = true;
  error = '';
//   faEye = faEye;
//   faEyeSlash = faEyeSlash;
//   faEnvelope = faEnvelope;
  hidePassword = true;
  passwordStrengthmeter: any;
  adminInterface = false;
  message = '';
//   @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;

  private closeSub!: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(form: NgForm) {
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
  onSwitchMode(form: NgForm) {
    this.registrationView = true;
  }
  showRegistrationView() {
    this.registrationView = true;
  }
  onHandleError() {
    this.message = '';
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
    //   AlertComponent
    // );
    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();

    // const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    // componentRef.instance.message = message;
    // this.closeSub = componentRef.instance.closeMessage.subscribe(() => {
    //   this.closeSub.unsubscribe();
    //   hostViewContainerRef.clear();
    // });
  }
}
