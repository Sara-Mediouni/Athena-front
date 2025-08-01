import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router"
import { Observable } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5500/api/users';
  
  constructor(private http: HttpClient, private router: Router) {}

  getUserById(id: number): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

   if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get(`${this.apiUrl}/getbyid/${id}`,{headers});
}
updateUser(id: number, data: any): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);

   if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.put(`${this.apiUrl}/update/${id}`, data,{headers});
}
getAllUsers(): Observable<any> {
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);
  
   if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  return this.http.get<any>(`${this.apiUrl}/users-custom`,{headers});

}
getUsersByMyEntreprise(){
  const token = localStorage != undefined ? localStorage.getItem('accessToken'): '';
  console.log('Token utilisé:', token);
  
   if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  return this.http.get<any>(`${this.apiUrl}/by-entreprise`,{headers});

}
  getUserConnected(token: string): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;
      
       return this.getUserById(userId).pipe(
        catchError((error:any) => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          throw error;  
        })
      );
    } else {
      throw new Error('localStorage is not available');
    }
  }}