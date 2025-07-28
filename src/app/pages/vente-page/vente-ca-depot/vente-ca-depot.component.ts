import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketsOpenComponent } from '../../../dashboard/help-desk/tickets-open/tickets-open.component';
import { NewTicketsCreatedComponent } from '../../../dashboard/help-desk/new-tickets-created/new-tickets-created.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TicketsInProgressComponent } from '../../../dashboard/help-desk/tickets-in-progress/tickets-in-progress.component';
import { TicketsClosedComponent } from '../../../dashboard/help-desk/tickets-closed/tickets-closed.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VenteService } from '../../../Service/VenteService';
import { DataLabelsColumnChartComponent } from '../../../apexcharts/column-charts/data-labels-column-chart/data-labels-column-chart.component';
import { DistributedColumnChartComponent } from '../../../apexcharts/column-charts/distributed-column-chart/distributed-column-chart.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BasicColumnChartComponent } from '../../../apexcharts/column-charts/basic-column-chart/basic-column-chart.component';
import { MatTableDataSource } from '@angular/material/table';
import { EntrepriseDTO } from '../../../Model/EntrepriseDTO';
import { VenteFilterComponent } from '../../../common/filters/vente-filter/vente-filter.component';


@Component({
  selector: 'app-vente-ca-depot',
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    
    MatInputModule,CommonModule,
    MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,
     MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
      MatNativeDateModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
      MatProgressSpinner,BasicColumnChartComponent,VenteFilterComponent,
      NgxMaterialTimepickerModule],
  templateUrl: './vente-ca-depot.component.html',
  styleUrl: './vente-ca-depot.component.scss'
})
export class VenteCaDepotComponent {
    

  
  data: []=[];
  
  errorMessage: string = '';
  CAGlobal: any;
  
  doc: any;
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<EntrepriseDTO>([]);

  
   constructor(private venteService: VenteService) { 


  }
    
  
 
 loadCA(filtre: any): void {
  const dateDebut = filtre.dateDebut.toISOString().split('T')[0];
  const dateFin = filtre.dateFin.toISOString().split('T')[0];
  const inclureBLs = filtre.inclureBLs ? 'true' : 'false';
  const mode = filtre.dateFacture ? 'dateFacture' : (filtre.dateBL ? 'dateBL' : 'dateFacture');
  const groupBy = "depot";

  this.isLoading = true;

  this.venteService.getCAPeriod(dateDebut, dateFin, mode, inclureBLs, groupBy).subscribe({
    next: (data) => {
      this.CAGlobal = data;
      this.isLoading = false;
      this.dataSource.data = this.CAGlobal;
    },
    error: (error) => {
      console.error('Erreur lors du chargement du CA Depot', error);
      this.errorMessage = 'Erreur lors du chargement du CA Depot';
      this.isLoading = false;
    }
  });
}

}
    






