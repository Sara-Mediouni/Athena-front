import { inject } from '@angular/core';
import { CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoaderService } from '../../apps/loader/loader.service';
import { AuthService } from '../../Service/AuthService';

export const authRoleGuard: CanActivateChildFn = async (route, state): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const loader = inject(LoaderService);
  const auth = inject(AuthService);

  loader.show();

  try {
    const user = await firstValueFrom(auth.currentUser$);

    if (!user) {
      loader.hide();
      return router.createUrlTree(['/authentication']);
    }

    const allowedRoles = route.data?.['roles'] as string[] || [];
    const role = user.role || 'USER';

    loader.hide();

    if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
      return true;
    } else {
      return redirectByRole(role, router);
    }
  } catch (error) {
    loader.hide();
    return router.createUrlTree(['/authentication']);
  }
};

function redirectByRole(role: string, router: Router): UrlTree {
  if (role === 'USER') {
    return router.createUrlTree(['/blank-page']);
  }
  return router.createUrlTree(['/dashboard']);
}
