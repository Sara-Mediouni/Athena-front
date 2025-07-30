import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntrepriseDTO } from '../Model/EntrepriseDTO';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class EntrepriseSelectionService {
  private selectedEntrepriseSubject = new BehaviorSubject<EntrepriseDTO | null>(null);
  private cookieService = inject(CookieService);
  selectedEntreprise$ = this.selectedEntrepriseSubject.asObservable();
constructor() {
    const stored = this.cookieService.get('selectedEntrepriseId');
    if (stored) {
      try {
        const ent = JSON.parse(stored);
        this.setSelectedEntreprise(ent);
      } catch (e) {
        console.warn('Entreprise stockée invalide');
      }
    }
  }

  setSelectedEntreprise(ent: EntrepriseDTO) {
    this.selectedEntrepriseSubject.next(ent);
    this.cookieService.set('selectedEntrepriseId', ent.id.toString(), 7);
   
  }

  getSelectedEntreprise(): EntrepriseDTO | null {
    return this.selectedEntrepriseSubject.value;
  }
}