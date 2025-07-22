import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VenteService  {

    

  private apiUrl = 'http://localhost:5500/caglobal';
  
  constructor(private http: HttpClient, private router: Router) {}

   getCAGlobal(dateDebut: string, dateFin: string, mode: string,inclureBLs:string): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const params = {
    dateDebut,
    dateFin,
    mode,
    inclureBLs
  };

  return this.http.get(`${this.apiUrl}/chiffre-affaire`, { headers, params });
}


}