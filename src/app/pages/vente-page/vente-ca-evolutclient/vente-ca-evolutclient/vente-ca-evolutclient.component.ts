import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { forkJoin, Subscription } from 'rxjs';
import { BasicColumnChartComponent } from '../../../../apexcharts/column-charts/basic-column-chart/basic-column-chart.component';
import { VenteFilterComponent } from '../../../../common/filters/vente-filter/vente-filter.component';
import { VenteService } from '../../../../Service/VenteService';
import { EntrepriseSelectionService } from '../../../../Service/EntrepriseSelectionService';
import { EntrepriseDTO } from '../../../../Model/EntrepriseDTO';
import { LineColumnChartComponent } from '../../../../apexcharts/mixed-charts/line-column-chart/line-column-chart.component';
import { LineAreaChartComponent } from '../../../../apexcharts/mixed-charts/line-area-chart/line-area-chart.component';
import { DistributedColumnChartComponent } from '../../../../apexcharts/column-charts/distributed-column-chart/distributed-column-chart.component';


@Component({
  selector: 'app-vente-ca-evolutclient',
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,CommonModule,VenteFilterComponent,
    MatButtonModule,MatDatepickerModule,MatCheckboxModule,
     MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
       FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
      MatProgressSpinner,
      NgxMaterialTimepickerModule],
  templateUrl: './vente-ca-evolutclient.component.html',
  styleUrl: './vente-ca-evolutclient.component.scss'
})
export class VenteCaEvolutclientComponent {
   private entrepriseSub!: Subscription;
       
     private lastFiltre: any;
   data: [] = [];
   errorMessage: string = '';
   CAGlobal1: any;
   CAGlobal2: any;
   isLoading: boolean = false;
   start1:any;
   CATTC:any;
   CAHT:any;
   start2:any;
   end1:any;
   end2:any;
   constructor(private venteService: VenteService,
       private entrepriseSelectionService: EntrepriseSelectionService) {
    
 
   }
 
 
 
 
   ngOnInit(): void {
    
     this.entrepriseSub = this.entrepriseSelectionService.selectedEntreprise$.subscribe((entreprise: EntrepriseDTO | null) => {
       if (entreprise && this.lastFiltre) {
         this.loadCA(this.lastFiltre);
       }
     });
   }
 
 loadCA(filtre: any): void {
   
  this.lastFiltre = filtre;
  const dateDebut = new Date(filtre.dateDebut).toISOString().split('T')[0];
 
 
   const dateFin = new Date(filtre.dateFin).toISOString().split('T')[0];
     const dateDebut2 = new Date(filtre.dateDebut2).toISOString().split('T')[0];
   const dateFin2 = new Date(filtre.dateFin2).toISOString().split('T')[0];
   this.CAHT= filtre.HT ? 'true' : 'false';
   this.CATTC= filtre.TTC ? 'true' : 'false';
   this.start1=dateDebut;
   this.end1=dateFin;
   this.start2=dateDebut2;
   this.end2=dateFin2;
   const inclureBLs = filtre.inclureBLs ? 'true' : 'false';
   const mode = filtre.dateFacture ? 'dateFacture' : (filtre.dateBL ? 'dateBL' : 'dateFacture');
   const groupBy = "client";
 
   this.isLoading = true;
 
   forkJoin([ this.venteService.getCAPeriod(dateDebut2, dateFin2, mode, inclureBLs, groupBy),
     this.venteService.getCAPeriod(dateDebut, dateFin, mode, inclureBLs, groupBy)
    
   ]).subscribe({
     next: ([data1, data2]) => {
       this.CAGlobal1 = data1;
       this.CAGlobal2 = data2;
       this.isLoading = false;
       console.log('CA Global 1 :', this.CAGlobal1);
       console.log('CA Global 2 :', this.CAGlobal2);
     },
     error: (error) => {
       console.error('Erreur lors du chargement du CA Global', error);
       this.errorMessage = 'Erreur lors du chargement du CA Global';
       this.isLoading = false;
     }
   });
 }
 
 ngOnDestroy(): void {
     this.entrepriseSub?.unsubscribe();
   }
 
 }
 