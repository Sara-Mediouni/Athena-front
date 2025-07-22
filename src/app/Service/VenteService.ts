import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "express";
import { Observable } from "rxjs";

@Injectable()
export class VenteService  {

    

  private apiUrl = 'http://localhost:5500/caglobal';
  
  constructor(private http: HttpClient, private router: Router) {}
}