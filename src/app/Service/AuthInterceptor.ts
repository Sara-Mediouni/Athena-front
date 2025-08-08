import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si le token est expiré ou invalide
        if (error.status === 401 || error.status === 403) {
          console.warn('Interception 401/403 - redirection login');

          // Déconnecte l'utilisateur et redirige
          this.authService.logout();
          this.router.navigate(['/authentication']);
        }

        return throwError(() => error);
      })
    );
  }
}
