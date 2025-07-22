import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VenteService  {

    

  private apiUrl = 'http://localhost:5500/api/caglobal';
  
  constructor(private http: HttpClient, private router: Router) {}

   getCAGlobal(dateDebut: string, dateFin: string, mode: string,InclureBLs:string): Observable<any> {
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
    InclureBLs
  };

  return this.http.get(`${this.apiUrl}/chiffre-affaire`, { params ,headers });
}
  getCAPeriod(dateDebut: string, dateFin: string, mode: string,InclureBLs:string, groupBy:string): Observable<any> {
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
    InclureBLs,
    groupBy
  };

  return this.http.get(`${this.apiUrl}/chiffre-periode`, { params ,headers });
}

}