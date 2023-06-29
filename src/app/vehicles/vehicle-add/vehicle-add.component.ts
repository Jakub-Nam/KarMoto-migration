import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AdditionalPhotosComponent } from './additional-photos/additional-photos.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormControl, FormGroup } from '@angular/forms';
import { Photo } from './photo';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})



export class VehicleAddComponent implements OnInit {
  @ViewChild('AdditionalPhotosComponent') additionalPhotos!: AdditionalPhotosComponent;
  vehicleWasSent = false;
  error = false;
  oneFile = false;
  isHovering = false;

  vehicleForm = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl(''),
    price: new FormControl(''),
    carMileage: new FormControl(''),
    productionYear: new FormControl('')
  });

  file: File[] = [];
  compressedFile: any;

  task!: AngularFireUploadTask;
  snapshot!: Observable<any>;
  downloadURL = '';

  timestamp = 0;
  brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  errorMessage: any;

  localUrl = '';
  localCompressedURl = '';
  sizeOfOriginalImage = 0;
  sizeOFCompressedImage = 0;
  imgResultBeforeCompress = '';
  imgResultAfterCompress = '';

  constructor(
    public vehicleDbService: VehicleDbService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
  }

  onSelectPhoto(event: Photo) {
    this.file = event.addedFiles;
    this.selectFile();
  }


  selectFile() {
    if (this.file && this.file[0]) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.localUrl = ev.target.result;
        this.compressFile(this.localUrl);
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  async compressFile(image: string) {
    const orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    this.imageCompress.compressFile(image, orientation, 50, 50)
      .then(
        async result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          this.compressedFile = imageBlob;
        });
  }
  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }



  async onSubmitPushVehicle(myForm: any) {
    await this.startUpload(this.compressedFile, myForm);
    this.file = [];
    this.additionalPhotos.clearDropZone();

  }

  onRemove(event: File) {
    this.file.splice(this.file.indexOf(event), 1);
  }

  startUpload(file: File, myForm: any) {

    const timestamp = Date.now();
    this.timestamp = timestamp;

    const path = `vehicles/${timestamp}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(async () => {

        this.downloadURL = await ref.getDownloadURL().toPromise();

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
    this.additionalPhotos.pushPhotos();
  }

  hideVehicleWasSentAlert() {
    this.vehicleWasSent = false;
  }

  hideErrorAlert() {
    this.errorMessage = false;
  }
}
