import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Model/User";
import { UserCreateDTO } from "../Model/UserCreateDTO";




@Injectable({
    providedIn: 'root'
  })


export class UserController {


    private baseUrl = "http://localhost:5500/api/users";

    


    constructor(private http: HttpClient) {}        



    getUser () : Observable <[User]> {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not accessible (environnement non-navigateur)');
  }
       const token = localStorage.getItem('accessToken');
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };


        return this.http.get<[User]>(`${this.baseUrl}/all`,{headers});
  
      }



      addUser(user: UserCreateDTO): Observable<User> {
        console.log("add user called");
       const token = localStorage.getItem('accessToken');
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };


        return this.http.post<User>(`${this.baseUrl}/add`, user,{headers});
      }

      updateUser(id:number , data:any): Observable<User> {
        console.log('🟢 update  appelé');
               const token = localStorage.getItem('accessToken');
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

        return this.http.put<User>(`${this.baseUrl}/put/${id}`, data,{headers});
      }

      deleteUser(id: number): Observable<void> {
               const token = localStorage.getItem('accessToken');
  console.log('Token utilisé:', token);

  // Vérifie que le token existe bien
  if (!token) {
    throw new Error('Token d\'authentification manquant');
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`,{headers});
      }


      getNameByEmail(email: string): Observable<{ name: string }> {
        return this.http.get<{ name: string }>(`${this.baseUrl}/name?email=${email}`,{ responseType: 'text' as 'json' });
      }


}