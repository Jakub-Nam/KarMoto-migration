import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Photo } from './../photo';

@Component({
  selector: 'app-additional-photos',
  templateUrl: './additional-photos.component.html',
  styleUrls: ['./additional-photos.component.css']
})

export class AdditionalPhotosComponent implements OnInit {
  @Input()
  set inputTimestamp(inputTimestamp: string) {
    this._inputTimestamp = `${inputTimestamp}`;
  }
  get inputTimestamp(): string {
    return this._inputTimestamp;
  }
  _inputTimestamp = '';
  isHovering = false;
  files: File[] = [];
  snapshot!: Observable<any>;
  errorAlert = false;

  imageBlob!: Blob;
  localUrl: any;
  localCompressedURl = '';
  sizeOfOriginalImage = 0;
  sizeOFCompressedImage = 0;
  imgResultBeforeCompress = '';
  imgResultAfterCompress = '';

  constructor(
    public automotiveDbService: VehicleDbService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
  }

  onSelectPhotos(event: Photo) {
    this.files.push(...event.addedFiles);
  }

  onRemovePhotos(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async pushPhotos() {
    await this.compressAndPushPhotos();
  }

  compressAndPushPhotos() {
    for (const file of this.files) {
      this.selectedFileToCompress(file);
    }
  }
  selectedFileToCompress(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.localUrl = ev.target.result;
        this.compressFile(this.localUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  compressFile(image: string) {
    const orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    this.imageCompress.compressFile(image, orientation, 50, 50)
      .then(
        async result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);

          this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);

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
    this.startUpload(blob);
  }

  startUpload(file: Blob) {

    const photoTimestamp = Date.now();

    const path = `vehicles/${photoTimestamp}`;

    const ref = this.storage.ref(path);

    const task: AngularFireUploadTask = this.storage.upload(path, file);

    const snapshot: Observable<any> = task.snapshotChanges();
    snapshot.pipe(
      finalize(async () => {
        const downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection(this.inputTimestamp).add(
          {
            downloadURL,
            path
          }
        );
      })
    ).subscribe();
  }
  clearDropZone() {
    this.files = [];
  }

}
