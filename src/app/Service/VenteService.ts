import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, switchMap, take, throwError } from "rxjs";
import { EntrepriseSelectionService } from "./EntrepriseSelectionService";
import { Entreprise } from "../Model/Entreprise";
import { EntrepriseDTO } from "../Model/EntrepriseDTO";

@Injectable({
  providedIn: 'root'
})
export class VenteService  {

   
  private apiUrl = 'http://localhost:5500/api/caglobal';
  private ent:EntrepriseDTO| null=null;
  constructor(private http: HttpClient, private router: Router,
      private entrepriseSelectionService: EntrepriseSelectionService) {
    
      }




getCAGlobal(dateDebut: string, dateFin: string, mode: string, InclureBLs: string): Observable<any> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  if (!token) {
    return throwError(() => new Error('Token d\'authentification manquant'));
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.entrepriseSelectionService.selectedEntreprise$.pipe(
    take(1),
    switchMap(ent => {
      if (!ent) {
        return throwError(() => new Error('Aucune entreprise sélectionnée'));
      }

      const params = {
        dateDebut,
        dateFin,
        mode,
        InclureBLs,
        id: ent.id.toString()
      };

      return this.http.get(`${this.apiUrl}/chiffre-affaire`, { headers, params });
    })
  );
}

getCAPeriod(dateDebut: string, dateFin: string, mode: string, InclureBLs: string, groupBy: string): Observable<any> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (!token) {
    return throwError(() => new Error('Token d\'authentification manquant'));
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

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

      return this.http.get(`${this.apiUrl}/chiffre-periode`, { headers, params });
    })
  );
}



}