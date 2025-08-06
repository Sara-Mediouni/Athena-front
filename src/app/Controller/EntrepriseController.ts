import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Entreprise } from "../Model/Entreprise";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseController {

  private baseUrl = "http://localhost:5500/api/ent";

  constructor(private http: HttpClient) {}

  addEntreprise(ent: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.baseUrl}/add`, ent, { withCredentials: true });
  }

  allEntreprise(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.baseUrl}/all`, { withCredentials: true });
  }
}
