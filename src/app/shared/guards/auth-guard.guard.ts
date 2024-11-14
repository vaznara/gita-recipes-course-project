import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { concatMap, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    concatMap((res) => {
      if (res) {
        return of(true);
      }

      const source = btoa(state.url.toString());

      return of(router.parseUrl(`/login?source=${source}`));
    }),
  );
};
