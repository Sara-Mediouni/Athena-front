import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, switchMap, take, throwError } from "rxjs";
import { EntrepriseSelectionService } from "./EntrepriseSelectionService";
import { EntrepriseDTO } from "../Model/EntrepriseDTO";

@Injectable({
  providedIn: 'root'
})
export class VenteService  {

  private apiUrl = 'http://localhost:5500/api/caglobal';

  constructor(
    private http: HttpClient,
    private router: Router,
    private entrepriseSelectionService: EntrepriseSelectionService,
  ) {}

  getCAGlobal(dateDebut: string, dateFin: string, mode: string, InclureBLs: string): Observable<any> {
    return this.entrepriseSelectionService.selectedEntreprise$.pipe(
      take(1),
      switchMap(ent => {
        if (!ent) {
          return throwError(() => new Error('Aucune entreprise sélectionnée'));
        }

        const params = new HttpParams()
          .set('dateDebut', dateDebut)
          .set('dateFin', dateFin)
          .set('mode', mode)
          .set('InclureBLs', InclureBLs)
          .set('id', ent.id.toString());

        return this.http.get(`${this.apiUrl}/chiffre-affaire`, { params, withCredentials: true });
      })
    );
  }

  getCAPeriod(dateDebut: string, dateFin: string, mode: string, InclureBLs: string, groupBy: string): Observable<any> {
    return this.entrepriseSelectionService.selectedEntreprise$.pipe(
      take(1),
      switchMap(ent => {
        if (!ent || !ent.id) {
          return throwError(() => new Error('Aucune entreprise sélectionnée ou ID manquant'));
        }

        const params = new HttpParams()
          .set('dateDebut', dateDebut)
          .set('dateFin', dateFin)
          .set('mode', mode)
          .set('InclureBLs', InclureBLs)
          .set('groupBy', groupBy)
          .set('id', ent.id.toString());

        return this.http.get(`${this.apiUrl}/chiffre-periode`, { params, withCredentials: true });
      })
    );
  }
}
