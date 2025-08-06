import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5500/api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getbyid/${id}`, { withCredentials: true });
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users-custom`, { withCredentials: true });
  }

  getUsersByMyEntreprise(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-entreprise`, { withCredentials: true });
  }

  
  getUserConnected(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
        return throwError(() => error);
      })
    );
  }
}
