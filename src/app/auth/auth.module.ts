import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AuthComponent } from './auth.component';
import { MatButtonModule } from '@angular/material/button';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    // PasswordStrengthMeterModule,
    // SharedModule
  ]
})
export class AuthModule {}
