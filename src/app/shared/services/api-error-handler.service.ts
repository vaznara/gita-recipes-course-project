import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

export class RcpError {
  title?: string;
  message!: string;

  constructor(error: HttpErrorResponse | { name: string, message: string }) {
    this.title = error.name;
    this.message = error.message;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiErrorHandlerService {

  constructor(private dialog: MatDialog) { }

  handleError(error: HttpErrorResponse | { name: string, message: string }): Observable<never> {
    this.dialog.closeAll();
    const rcpError = new RcpError(error);
    this.dialog.open(ErrorDialogComponent, {
      data: rcpError
    })

    return throwError(() => rcpError)
  }
}
