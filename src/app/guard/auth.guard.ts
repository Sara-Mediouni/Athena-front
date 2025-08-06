import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/AuthService';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

 
  const isLoggedIn = auth.isLoggedIn();
  console.log('[AuthGuard] Authenticated:', isLoggedIn);

  return isLoggedIn
    ? true
    : router.createUrlTree(['/authentication']);
};
