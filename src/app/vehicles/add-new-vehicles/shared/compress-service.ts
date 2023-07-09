import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { NgxImageCompressService } from "ngx-image-compress";
import { Photo } from "./photo";

@Injectable({ providedIn: 'root' })

export class CompressService {
    private compressedFile: BehaviorSubject<any> = new BehaviorSubject<any>('Initial Value');
    public data$: Observable<any> = this.compressedFile.asObservable();

    private imgResultAfterCompress: string = '';
    // imgResultBeforeCompress: string = '';
    public localCompressedURl: string = '';
    private localUrl: string = '';
    public sizeOFCompressedImage: number = 0;
    public sizeOfOriginalImage: number = 0;

    constructor(
        private imageCompress: NgxImageCompressService,
    ) { }

    onSelectPhoto(event: Photo) {
        let file: File[] = event.addedFiles;
        if (file && file[0]) {
            const reader = new FileReader();
            reader.onload = (ev: any) => {
                this.localUrl = ev.target.result;
                this.compressFile(this.localUrl);
            };
            reader.readAsDataURL(file[0]);
        }
    }

    compressFile(image: string) {
        const orientation = -1;
        this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
        this.imageCompress.compressFile(image, orientation, 50, 50)
            .then(
                result => {
                    this.imgResultAfterCompress = result;
                    this.localCompressedURl = result;
                    this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
                    const imageBlob: Blob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
                    this.updateData(imageBlob)
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

    updateData(blob: Blob) {
        this.compressedFile.next(blob);
    }
}
