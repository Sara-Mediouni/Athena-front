import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router"
import { Observable } from "rxjs";
import { EntrepriseDTO } from "../Model/EntrepriseDTO";

@Injectable({
  providedIn: 'root'
})
export class EntService {

  private apiUrl = 'http://localhost:5500/api/ent';
  private addUrl = 'http://localhost:5500/api/ent/add';
  private getUrl = 'http://localhost:5500/api/ent/all';
  constructor(private http: HttpClient, private router: Router) {}

  add(entreprise:any): Observable<any>{
    const token = localStorage.getItem('accessToken');



  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  return this.http.post(`${this.apiUrl}/add`, entreprise,{headers});
}

  
getAll(): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);
  
  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  return this.http.get<any>(this.getUrl, { headers });
}
deleteEntreprise(id: number): Observable<void> {
    const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
}
updateEntreprise(id: number, data: any): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.put(`${this.apiUrl}/update/${id}`, data,{headers});
}

getEntrepriseById(id: number): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get(`${this.apiUrl}/getbyid/${id}`,{headers});
}
getMyEntreprise(): Observable<EntrepriseDTO[] | null> {
  const token =  (typeof window !== 'undefined') && localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get<EntrepriseDTO[] | null>(`${this.apiUrl}/me`,{headers});
}
}
