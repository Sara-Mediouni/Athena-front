import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { LoaderService } from '../apps/loader/loader.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loader = inject(LoaderService);

  const token = (typeof localStorage !== "undefined") ? localStorage.getItem('accessToken'): null;

  if (token) {
    loader.hide();
    return true;
  } else {
    loader.show();
    // Retourner un UrlTree pour rediriger sans flash
    return router.createUrlTree(['/authentication']);
  }
};
