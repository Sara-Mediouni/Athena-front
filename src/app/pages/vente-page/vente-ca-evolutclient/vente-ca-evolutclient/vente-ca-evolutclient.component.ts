import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
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

import { BehaviorSubject, filter, forkJoin, Subscription, switchMap } from 'rxjs';
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
  templateUrl: './vente-ca-evolutclient.component.html',
  styleUrl: './vente-ca-evolutclient.component.scss',
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
})
export class VenteCaEvolutclientComponent implements OnInit, OnDestroy {
  private entrepriseSub!: Subscription;
  @Input() client:any;
  clients: string[] = [];
  isLoading = false;
  errorMessage = '';
  CAGlobal1: any;
  CAGlobal2: any;
  lastFiltre: any;
 
  clientSelection = new BehaviorSubject<string | null>(null); 

  constructor(
    private venteService: VenteService,
    private entrepriseSelectionService: EntrepriseSelectionService
  ) {}

  ngOnInit(): void {
    this.entrepriseSub = this.entrepriseSelectionService.selectedEntreprise$
      .pipe(
        filter(ent => !!ent),
        switchMap(entreprise => {
          if (!this.lastFiltre) return new BehaviorSubject([]);
          const dateDebut = new Date(this.lastFiltre.dateDebut).toISOString().split('T')[0];
          const dateFin = new Date(this.lastFiltre.dateFin).toISOString().split('T')[0];
          const mode = this.lastFiltre.dateFacture ? 'dateFacture' : (this.lastFiltre.dateBL ? 'dateBL' : 'dateFacture');
          const inclureBLs = this.lastFiltre.inclureBLs ? 'true' : 'false';
          const groupBy = 'client';

          this.isLoading = true;
          return this.venteService.getClientList(dateDebut, dateFin, mode, inclureBLs, groupBy);
        })
      )
      .subscribe({
        next: clients => {
          this.clients = clients;
          console.log(clients)
          this.isLoading = false;
        },
        error: err => {
          this.errorMessage = 'Erreur chargement clients';
          console.error(err);
          this.isLoading = false;
        }
      });

   
    this.clientSelection.subscribe(client => {
      if (this.lastFiltre) {
        this.loadCA(this.lastFiltre,client);
      }
    });
  }

 
  onFilter(filtre: any) {
    this.lastFiltre = filtre;
     if (this.client) {
    this.loadCA(filtre, this.client); 
  }


   
  }

  loadCA(filtre: any,client:any): void {
    this.lastFiltre=filtre;
    const dateDebut = new Date(filtre.dateDebut).toISOString().split('T')[0];
    const dateFin = new Date(filtre.dateFin).toISOString().split('T')[0];
    const dateDebut2 = new Date(filtre.dateDebut2).toISOString().split('T')[0];
    const dateFin2 = new Date(filtre.dateFin2).toISOString().split('T')[0];
    const inclureBLs = filtre.inclureBLs ? 'true' : 'false';
    const mode = filtre.dateFacture ? 'dateFacture' : (filtre.dateBL ? 'dateBL' : 'dateFacture');
    const groupBy = "client";

    this.isLoading = true;
    console.log(client);
    forkJoin([
      this.venteService.getCAClient(dateDebut2, dateFin2, mode, inclureBLs, client, groupBy),
      this.venteService.getCAClient(dateDebut, dateFin, mode, inclureBLs,client, groupBy)
    ]).subscribe({
      next: ([data1, data2]) => {
        this.CAGlobal1 = data1;
        console.log(data1);
        this.CAGlobal2 = data2;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du CA Global';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  
  onClientSelected(client: string) {
    this.client=client;
    this.clientSelection.next(client);
    
     if (this.lastFiltre) {
    this.loadCA(this.lastFiltre, client);
  }
  }

  ngOnDestroy(): void {
    this.entrepriseSub?.unsubscribe();
  }
}
