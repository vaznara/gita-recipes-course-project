import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { catchError, concatMap, from, Observable, tap } from 'rxjs';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { LoaderService } from './loader.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private errorHandler: ApiErrorHandlerService,
    private loaderService: LoaderService
  ) { }

  uploadImage(file: File): Observable<string> {

    if (file.size > +environment.maxFileSize) {
      return this.errorHandler.handleError({ name: 'File too big', message: `Maximum image size is ${+environment.maxFileSize / 1024}KB` });
    }

    this.loaderService.isLoading$.next(true);
    const fileName = crypto.randomUUID();
    const imagesFolderRef = ref(getStorage(), `images/${fileName}.${this.getFileExtension(file.name)}`);

    return from(uploadBytes(imagesFolderRef, file)).pipe(
      concatMap(snapshot => getDownloadURL(snapshot.ref)),
      tap(() => this.loaderService.isLoading$.next(false)),
      catchError((error) => {
        this.loaderService.isLoading$.next(false)
        return this.errorHandler.handleError(error);
      })
    );
  }

  deletImage(imagePath: string): Observable<void> {
    const imageRef = ref(getStorage(), imagePath);
    return from(deleteObject(imageRef))
  }

  private getFileExtension(fileName: string): string {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }
}
