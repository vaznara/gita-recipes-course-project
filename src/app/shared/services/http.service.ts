import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ApiErrorHandlerService } from './api-error-handler.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private errorHandler: ApiErrorHandlerService,
    private loaderService: LoaderService,
  ) {}

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.loaderService.isLoading$.next(true);
    return this.http.get<T>(url, { params, headers }).pipe(
      tap(() => this.loaderService.isLoading$.next(false)),
      catchError((error) => {
        this.loaderService.isLoading$.next(false);
        return this.errorHandler.handleError(error);
      }),
    );
  }

  post<T>(url: string, body: object, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.loaderService.isLoading$.next(true);
    return this.http.post<T>(url, body, { params, headers }).pipe(
      tap(() => this.loaderService.isLoading$.next(false)),
      catchError((error) => {
        this.loaderService.isLoading$.next(false);
        return this.errorHandler.handleError(error);
      }),
    );
  }

  patch<T>(url: string, body: object, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.loaderService.isLoading$.next(true);
    return this.http.patch<T>(url, body, { params, headers }).pipe(
      tap(() => this.loaderService.isLoading$.next(false)),
      catchError((error) => {
        this.loaderService.isLoading$.next(false);
        return this.errorHandler.handleError(error);
      }),
    );
  }

  put<T>(url: string, body: object, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.loaderService.isLoading$.next(true);
    return this.http.put<T>(url, body, { params, headers }).pipe(
      tap(() => this.loaderService.isLoading$.next(false)),
      catchError((error) => {
        this.loaderService.isLoading$.next(false);
        return this.errorHandler.handleError(error);
      }),
    );
  }

  delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    this.loaderService.isLoading$.next(true);
    return this.http.delete<T>(url, { params, headers }).pipe(
      tap(() => this.loaderService.isLoading$.next(false)),
      catchError((error) => {
        this.loaderService.isLoading$.next(false);
        return this.errorHandler.handleError(error);
      }),
    );
  }
}
