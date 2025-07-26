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
import { AuthService } from '../../Service/AuthService';

export const authRoleGuard: CanActivateChildFn = async (route, state): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const loader = inject(LoaderService);
  const auth = inject(AuthService);

 
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/authentication']);
  }

  
  loader.show();
  const user = await auth.getCurrentUserOrLoad(); 

  loader.hide();

  if (!user) {
    return router.createUrlTree(['/authentication']);
  }

  const allowedRoles = route.data?.['roles'] as string[];
  const role = user.role || 'USER';

  if (!allowedRoles || allowedRoles.includes(role)) {
    return true;
  }

  return redirectByRole(role, router);
};


function redirectByRole(role: string, router: Router): UrlTree {
  if (role === 'USER') {
    return router.createUrlTree(['/blank-page']);
  }
  return router.createUrlTree(['/dashboard']);
}
