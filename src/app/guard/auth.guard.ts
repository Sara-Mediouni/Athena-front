import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
    // Récupérer l'instance de Router
  const router = inject(Router);

  // Vérifier si le token d'authentification est présent dans localStorage
  const token = (typeof localStorage !== "undefined") ? localStorage.getItem('accessToken'): null;

  // Si le token est trouvé, l'accès est autorisé
  if (token) {
    return true;
  } else {
    // Sinon, rediriger vers la page de login
    router.navigate(['/authenticate']);
    return false;
  }
};
