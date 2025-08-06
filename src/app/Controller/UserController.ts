import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../Model/User";
import { UserCreateDTO } from "../Model/UserCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class UserController {

  private baseUrl = "http://localhost:5500/api/users";

  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`, { withCredentials: true }).pipe(
      catchError(err => {
        console.error('Erreur getUser:', err);
        return throwError(() => err);
      })
    );
  }

  addUser(user: UserCreateDTO): Observable<User> {
    console.log("➕ addUser appelé");
    return this.http.post<User>(`${this.baseUrl}/add`, user, { withCredentials: true }).pipe(
      catchError(err => {
        console.error('Erreur addUser:', err);
        return throwError(() => err);
      })
    );
  }

  updateUser(id: number, data: any): Observable<User> {
    console.log('🟢 updateUser appelé');
    return this.http.put<User>(`${this.baseUrl}/put/${id}`, data, { withCredentials: true }).pipe(
      catchError(err => {
        console.error('Erreur updateUser:', err);
        return throwError(() => err);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    console.log('🗑️ deleteUser appelé');
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { withCredentials: true }).pipe(
      catchError(err => {
        console.error('Erreur deleteUser:', err);
        return throwError(() => err);
      })
    );
  }

  getNameByEmail(email: string): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(
      `${this.baseUrl}/name?email=${encodeURIComponent(email)}`,
      { withCredentials: true }
    ).pipe(
      catchError(err => {
        console.error('Erreur getNameByEmail:', err);
        return throwError(() => err);
      })
    );
  }
}
