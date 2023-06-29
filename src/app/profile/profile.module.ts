import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileDataEditComponent } from './profile-data-edit/profile-data-edit.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ProfileDataEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ProfileDataEditComponent }]),

    SharedModule
  ]
})
export class ProfileModule {}

