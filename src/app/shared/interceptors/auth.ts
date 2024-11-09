import { inject } from '@angular/core';
import {
  HttpEvent, HttpHandlerFn, HttpRequest,
} from '@angular/common/http';
import { concatMap, from, Observable, of } from 'rxjs';
import { AuthService } from '../services';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  return authService.currentUser$.pipe(
    concatMap(user => user === null ? of(null) : from(user.getIdToken())),
    concatMap(token => {
      if (token === null) {
        return next(req);
      }

      const requestWithToken = req.clone({
        params: req.params.append('auth', token)
      })

      return next(requestWithToken)
    })
  )
}
