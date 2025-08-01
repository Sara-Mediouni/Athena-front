import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { Router } from "@angular/router";



@Injectable({
    providedIn: 'root'
  })


  export class TokenService {


    private refreshTokenInterval: any;


    constructor(private authService: AuthService, private router: Router) {}



    stopRefreshTokenTimer() {
        if (this.refreshTokenInterval) {
            clearTimeout(this.refreshTokenInterval);
        }
    }

    decodeToken(token: string) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("Invalid token structure, expected 3 parts.");
            return null;  
        }

         const payload = parts[1];
        
         const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = atob(base64);
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;  
    }
    }




  }