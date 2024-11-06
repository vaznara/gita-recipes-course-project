import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

export class RcpError {
  code!: string;
  title?: string;
  message!: string;

  constructor(error: HttpErrorResponse) {
    this.code = error.error.code;
    this.title = error.name;
    this.message = error.message;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiErrorHandlerService {

  constructor(private dialog: MatDialog) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.dialog.closeAll();
    const rcpError = new RcpError(error);
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data: rcpError
    })

    return throwError(() => rcpError)
  }
}
