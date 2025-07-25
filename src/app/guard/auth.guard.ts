import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { LoaderService } from '../apps/loader/loader.service';
import { AuthService } from '../Service/AuthService';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loader = inject(LoaderService);
  const auth = inject(AuthService);

  const token = (typeof localStorage !== "undefined") ? localStorage.getItem('accessToken'): null;

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/authentication']);
};
