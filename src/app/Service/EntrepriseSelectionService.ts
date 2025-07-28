import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntrepriseDTO } from '../Model/EntrepriseDTO';

@Injectable({ providedIn: 'root' })
export class EntrepriseSelectionService {
  private selectedEntrepriseSubject = new BehaviorSubject<EntrepriseDTO | null>(null);
  selectedEntreprise$ = this.selectedEntrepriseSubject.asObservable();

  setSelectedEntreprise(ent: EntrepriseDTO) {
    this.selectedEntrepriseSubject.next(ent);
  }

  getSelectedEntreprise(): EntrepriseDTO | null {
    return this.selectedEntrepriseSubject.value;
  }
}
