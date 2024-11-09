import { Injectable } from '@angular/core';
import { deleteObject, getStorage, ref, uploadBytes, UploadResult } from '@angular/fire/storage';
import { catchError, from, Observable, tap } from 'rxjs';
import { ENV_VARIABLES } from '../../../environments/environment.dev';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private errorHandler: ApiErrorHandlerService, private loaderService: LoaderService) { }

  uploadImage(file: File): Observable<UploadResult> {

    if (file.size > ENV_VARIABLES.maxFileSize) {
      return this.errorHandler.handleError({ name: 'File too big', message: `Maximum image size is ${ENV_VARIABLES.maxFileSize / 1024}KB` });
    }

    this.loaderService.isLoading$.next(true);
    const fileName = crypto.randomUUID();
    const imagesFolderRef = ref(getStorage(), `images/${fileName}.${this.getFileExtension(file.name)}`);

    return from(uploadBytes(imagesFolderRef, file)).pipe(
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
