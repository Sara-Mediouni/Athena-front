// auth-role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { LoaderService } from '../../apps/loader/loader.service';
import { UserService } from '../../Service/UserService';


@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private loader: LoaderService,
    private userService: UserService
  ) {}

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.loader.show();
      return this.router.createUrlTree(['/authentication']);
    }

    let user;
    try {
      user = await firstValueFrom(this.userService.getUserConnected(token));
    } catch (e) {
      console.error('Erreur utilisateur :', e);
      return this.router.createUrlTree(['/authentication']);
    }

    const userRole = user?.role || 'USER';
    const allowedRoles = childRoute.data?.['roles'] as string[];

    if (!allowedRoles || allowedRoles.includes(userRole)) {
      this.loader.hide();
      return true;
    }

    this.loader.hide();
    return this.redirectByRole(userRole);
  }

  private redirectByRole(role: string): UrlTree {
    if (role==="USER") {
     
        return this.router.createUrlTree(['/blank-page']);
   
     
    }
    return this.router.createUrlTree(['/dashboard']); 
  }
}
