import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, DocumentChange, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Vehicle } from './interfaces/vehicle';

interface UrlSet {
  downloadURL: string,
  path: string
}

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

  fetchMainPhotoURL(path: string): Observable<Vehicle>{
    return this.db.collection('vehicles').doc(`a${path}`).valueChanges() as Observable<Vehicle>;
  }

  fetchAdditionalPhotosURL(path: string): Observable<string[]> {
    return this.db.collection(path)
      .snapshotChanges()
      .pipe(
        map((data: DocumentChangeAction<unknown>[]) => {
          let arrURL: string[] = [];
          for (let i = 0; i < data.length; i++) {
            const payload: DocumentChange<UrlSet> = data[i].payload as DocumentChange<UrlSet>;
            const urlSet: UrlSet = payload.doc.data() as UrlSet;
            const { downloadURL } = urlSet;
            arrURL.push(downloadURL)
          }
          return arrURL;
        }),
        catchError(error => {
          console.error('Error occurred:', error);
          return of([]); 
        })
      )
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
