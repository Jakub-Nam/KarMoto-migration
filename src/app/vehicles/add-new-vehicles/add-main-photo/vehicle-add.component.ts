import { AdditionalPhotosComponent } from '../add-additional-photos/additional-photos.component';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Observable, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { MatButtonModule } from '@angular/material/button';
import { Photo } from '../shared/photo';
import { CompressService } from '../shared/compress-service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    AdditionalPhotosComponent,
    MatButtonModule
  ],
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})

export class VehicleAddComponent implements OnInit {
  @ViewChild('AdditionalPhotosComponent') additionalPhotos!: AdditionalPhotosComponent;
  error: boolean = false;
  isHovering: boolean = false;
  vehicleWasSent: boolean = false;
  file!: File[]

  vehicleForm = this.formBuilder.group({
    name: [''],
    brand: [''],
    price: [''],
    carMileage: [''],
    productionYear: ['']
  });

  compressedFile!: Blob;

  task!: AngularFireUploadTask;
  snapshot!: Observable<any>;
  downloadURL: string = '';

  errorMessage: any;
  timestamp: number = 0;

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private compressService: CompressService,
    public vehicleDbService: VehicleDbService
  ) {}

  ngOnInit(): void {
    this.compressService.data$.subscribe((compressedFile) => {
      this.compressedFile = compressedFile
    });
  }

  async onSubmitPushVehicle(myForm: any) {
    await this.startUpload(this.compressedFile, myForm);
    // this.additionalPhotos.clearDropZone();
    this.file = [];
  }

  startUpload(file: Blob, myForm: any) {

    const timestamp: number = Date.now();
    this.timestamp = timestamp;

    const path: string = `vehicles/${timestamp}`;
    this.task = this.storage.upload(path, file);

    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(async () => {

        await this.setDownloadUrl(path)
        await this.db.collection('vehicles').doc(`a${timestamp}`).set(
          {
            name: this.vehicleForm.value.name,
            brand: this.vehicleForm.value.brand,
            price: this.vehicleForm.value.price,
            carMileage: this.vehicleForm.value.carMileage,
            downloadURL: this.downloadURL,
            timestamp,
            path
          });
        myForm.reset();
        this.vehicleWasSent = true;
      }),
      catchError(err => {
        this.errorMessage = err;
        return throwError(this.errorMessage);
      }),
    );
    // this.additionalPhotos.pushPhotos();
  }

  setDownloadUrl(path: string) {
    const ref: AngularFireStorageReference = this.storage.ref(path);
    ref.getDownloadURL().subscribe(
      (downloadUrl: string) => {
        this.downloadURL = downloadUrl; 
      },
      // (error) => {
      //   // Obsłuż błąd
      // }
    )
  }

  onSelectPhoto(event: Photo) {
    this.compressService.onSelectPhoto(event);
    this.file = event.addedFiles;
  }

  onRemove(event: File) {
    this.file.splice(this.file.indexOf(event), 1);
  }

  hideVehicleWasSentAlert() {
    this.vehicleWasSent = false;
  }

  hideErrorAlert() {
    this.errorMessage = false;
  }
}
