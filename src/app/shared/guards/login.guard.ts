import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { concatMap, of } from 'rxjs';
import { AuthService } from '../services';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    concatMap((res) => {
      if (!res) {
        return of(true);
      }

      return router.navigate(['/']);
    }),
  );
};
