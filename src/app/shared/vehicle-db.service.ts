import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleDbService {

  constructor(
    public storage: AngularFireStorage,
    public db: AngularFirestore
  ) { }

  fetchProfileData() {
    return this.db.collection('profiles').doc('mainProfile')
      .valueChanges();
  }

  fetchAllVehicles() {
    return this.db.collection('vehicles', ref => ref
      .orderBy('timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(data => {
          let dataArray = [];
          for (let i = 0; i < data.length; i++) {
            dataArray.push(data[i].payload.doc.data())
          }
          return dataArray;
        }
        )
      );
  }
  
  fetchMainPhoto(path: string) {
    return this.db.collection('vehicles').doc(`a${path}`).valueChanges();
  }

  fetchAdditionalVehiclePhotos(path: string) {
    return this.db.collection(path)
      .snapshotChanges()
      .pipe(
        map(data => {
          let dataArray = [];
          for (let i = 0; i < data.length; i++) {
            dataArray.push(data[i].payload.doc.data())
          }
          return dataArray;
        }
        )
      );
  }

  deleteMainPhotoInStorage(path: string) {
    return this.storage.ref(path).delete().toPromise();
  }

  deleteSecondaryPhotos(collectionId: number) {
    return this.db.collection(`${collectionId}`).get().toPromise();
  }

  deleteMainDocument(documentId: string) {
    return this.db.collection('vehicles').doc(documentId).delete();
  }

  deletePhotosURLs(collectionId: number) {
    return this.db.collection(`${collectionId}`).get().toPromise();
  }
}
