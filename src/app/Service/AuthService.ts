import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, of, tap, throwError } from "rxjs";
import { UserService } from "./UserService";
import { User } from "../Model/User";







@Injectable({
    providedIn: 'root'
  })


  export class AuthService { 


    
  private baseUrl = 'http://localhost:5500/api/auth/login';
  private signUrl = 'http://localhost:5500/api/auth/signup';

  private apiUrl = 'http://localhost:5500/api/auth';
  private isAuthenticated = false;
  private usernameOrEmail: string = '';
    // Ajout d'une variable pour suivre le statut de chargement


private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router,private userService: UserService) {
      const token = (typeof localStorage !== "undefined") ? localStorage.getItem('accessToken'): null;
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { usernameOrEmail, password }).pipe(
     tap(userData => {
  if (typeof window !== 'undefined' && userData) {
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);

    this.isAuthenticated = true;
    this.isAuthenticatedSubject.next(true); // 🔥
  }
})

    );
  }
  signup(usernameOrEmail: string, name:string, password: string, role: string): Observable<any> {
    return this.http.post<any>(this.signUrl, { usernameOrEmail, name, password, role }).pipe(
      tap(userData => {
        console.log('Role Est:', userData.role);
        if (typeof window !== 'undefined' && userData) {
         
          localStorage.setItem('accessToken', userData.accessToken);
          localStorage.setItem('refreshToken', userData.refreshToken);
    
          
        }
      })
    );
  }
  refreshToken(): Observable<any> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token available'));

    if (this.isAccessTokenExpired()) {
      return this.http.post(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
        map((response: any) => {
          if (response.accessToken) {
            this.storeTokens(response.accessToken, response.refreshToken);
          }
          return response;
        }),
        catchError(error => throwError(() => error))
      );
    } else {
      console.log("Le jeton d'accès est encore valide.");
      return of(null);
    }
  }

  private getStoredRefreshToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  }

  private storeTokens(accessToken: string, refreshToken: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
 loadUserFromToken(token: string): void {
    this.userService.getUserConnected(token).subscribe(
      (user) => {
        
        this.currentUserSubject.next(user); // Mettre à jour l'état utilisateur
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        this.currentUserSubject.next(null); // Réinitialiser l'utilisateur en cas d'erreur
      }
    );
  }
getCurrentUserOrLoad(): Promise<User | null> {
  const current = this.currentUserSubject.value;
  if (current) return Promise.resolve(current);

  const token = localStorage.getItem('accessToken');
  if (!token) return Promise.resolve(null);

  return firstValueFrom(this.userService.getUserConnected(token))
    .then(user => {
      this.currentUserSubject.next(user);
      return user;
    })
    .catch(() => null);
}

  // Déconnexion de l'utilisateur
  logout(): void {
  this.currentUserSubject.next(null);
  this.isAuthenticated = false;
  this.isAuthenticatedSubject.next(false); 

  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
}

   isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
   initAuth(): void {
  const token = localStorage.getItem('accessToken');
  const valid = !!token && !this.isAccessTokenExpired();

  this.isAuthenticated = valid;
  this.isAuthenticatedSubject.next(valid);
}

  private isAccessTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;

    const token = localStorage.getItem('accessToken');
    if (!token) return true;

    const decodedToken: any = this.jwt_decode(token);
    const expirationDate = decodedToken.exp * 1000;
    return Date.now() >= expirationDate;
  }

  setUsernameOrEmail(usernameOrEmail: string): void {
    
    this.usernameOrEmail = usernameOrEmail;
  }

  getEmail(): string | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      console.log('User dans localStorage:', user);
      return user ? JSON.parse(user).email : null;
    }
    return null;
  }

  handleLogout(): void {
    if (typeof localStorage !== 'undefined')  {
 
              localStorage.clear();}
        
    

    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      console.log('methode get role :', role);
      return role;
    }
    return null;
  }

  getUserObservable(): Observable<any | null> {
    return this.currentUser$;
  }

  private jwt_decode(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return {};
    }
  }



 


   

  }


 