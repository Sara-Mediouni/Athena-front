// auth-role.guard.ts
import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  Router,
  UrlTree
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoaderService } from '../../apps/loader/loader.service';
import { UserService } from '../../Service/UserService';

export const authRoleGuard: CanActivateChildFn = async (route, state): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const loader = inject(LoaderService);
  const userService = inject(UserService);

  const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('accessToken') : null;

  if (!token) {
    loader.show();
    return router.createUrlTree(['/authentication']);
  }

  let user;
  try {
    user = await firstValueFrom(userService.getUserConnected(token));
  } catch (e) {
    console.error('Erreur utilisateur :', e);
    return router.createUrlTree(['/authentication']);
  }

  const userRole = user?.role || 'USER';
  const allowedRoles = route.data?.['roles'] as string[];

  if (!allowedRoles || allowedRoles.includes(userRole)) {
    loader.hide();
    return true;
  }

  loader.hide();
  return redirectByRole(userRole, router);
};

function redirectByRole(role: string, router: Router): UrlTree {
  if (role === 'USER') {
    return router.createUrlTree(['/blank-page']);
  }
  return router.createUrlTree(['/dashboard']);
}
