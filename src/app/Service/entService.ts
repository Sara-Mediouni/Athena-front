import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EntrepriseDTO } from "../Model/EntrepriseDTO";

@Injectable({
  providedIn: 'root'
})
export class EntService {
  private apiUrl = 'http://localhost:5500/api/ent';

  constructor(private http: HttpClient) {}

  add(entreprise: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, entreprise, { withCredentials: true });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, { withCredentials: true });
  }

  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
  }

  updateEntreprise(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { withCredentials: true });
  }

  getEntrepriseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getbyid/${id}`, { withCredentials: true });
  }

  getMyEntreprise(): Observable<EntrepriseDTO[] | null> {
    return this.http.get<EntrepriseDTO[] | null>(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
