import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./AuthService";





@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');

        // Ajout du token d'accès s'il est disponible
        let authReq = req;
        if (accessToken) {
          authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` }
          });
        }
    
        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            // Si une erreur 401 est reçue, essayons de rafraîchir le token
            if (error.status === 401) {
              return this.authService.refreshToken().pipe(
                switchMap((newTokens: any) => {
                  // Stocker le nouveau token
                  const newAccessToken = newTokens.accessToken;
                  localStorage.setItem('accessToken', newAccessToken);
    
                  // Rejouer la requête initiale avec le nouveau token
                  const newRequest = req.clone({
                    setHeaders: { Authorization: `Bearer ${newAccessToken}` }
                  });
                  return next.handle(newRequest);
                }),
                catchError((refreshError) => {
                  // En cas d'échec de rafraîchissement, déconnecter l'utilisateur
                  this.authService.logout();
                  return throwError(refreshError);
                })
              );
            } else {
              return throwError(error);
            }
          })
        );
      }



    }