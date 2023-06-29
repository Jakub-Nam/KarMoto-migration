import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-data-edit',
  templateUrl: './profile-data-edit.component.html',
  styleUrls: ['./profile-data-edit.component.css']
})
export class ProfileDataEditComponent implements OnInit {
  message = '';

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    street: new FormControl(''),
    postCode: new FormControl(''),
    city: new FormControl('')
  });

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  onSubmitChangeProfile(form: any) {
    this.db.collection('profiles').doc('mainProfile').set(
      {
        name: form.value.name,
        phoneNumber: form.value.phoneNumber,
        email: form.value.email,
        street: form.value.street,
        postCode: form.value.postCode,
        city: form.value.city,
      })

      .then(event => {
        window.alert('Poprawnie wprowadzono dane');
        form.reset();
      })
      .catch(err => {
        window.alert('Wystąpił błąd podczas wczytywania danych');
      });
    form.reset();
  }
  onHandleError() {
    this.message = '';
  }
}
