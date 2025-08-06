import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs";
import { UserService } from "./UserService";
import { User } from "../Model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5500/api/auth/login';
  private signUrl = 'http://localhost:5500/api/auth/signup';
   private Url = 'http://localhost:5500/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { usernameOrEmail, password }, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
        this.loadUser();
      })
    );
  }

  signup(usernameOrEmail: string, name: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(this.signUrl, { usernameOrEmail, name, password, role }, { withCredentials: true });
  }

  loadUser(): void {
    this.userService.getUserConnected().subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      },
      error: () => {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  logout(): void {
    
    this.http.post('/api/auth/logout', {}, { withCredentials: true }).subscribe(() => {
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  initAuth(): void {
    this.loadUser(); 
  }
    refreshToken(): Observable<any> {
    return this.http.post(`${this.Url}/refresh`, {}, { withCredentials: true }).pipe(
      tap(() => console.log('Token rafraîchi')),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }
}
