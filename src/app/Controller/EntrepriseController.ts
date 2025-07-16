import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Entreprise } from "../Model/Entreprise";









@Injectable({
    providedIn: 'root'
  })



export class EntrepriseController {


    private baseUrl = "http://localhost:5500/api/ent";

    


    constructor(private http: HttpClient) {}      
    
    
      addEntreprise(ent: Entreprise): Observable<Entreprise> {
               const token = localStorage.getItem('accessToken');
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
            return this.http.post<Entreprise>(`${this.baseUrl}/add`, ent,{headers});
          }
    
      allEntreprise(): Observable<Entreprise[]> {
               const token = localStorage.getItem('accessToken');
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get<Entreprise[]>(`${this.baseUrl}/all`,{headers});
}

    




}