import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BasicLineChartComponent } from '../../../apexcharts/line-charts/basic-line-chart/basic-line-chart.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AdvancedFormComponent } from '../../../forms/advanced-elements/advanced-form/advanced-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TicketsOpenComponent } from '../../../dashboard/help-desk/tickets-open/tickets-open.component';
import { TicketsInProgressComponent } from '../../../dashboard/help-desk/tickets-in-progress/tickets-in-progress.component';
import { TicketsClosedComponent } from '../../../dashboard/help-desk/tickets-closed/tickets-closed.component';
import { NewTicketsCreatedComponent } from '../../../dashboard/help-desk/new-tickets-created/new-tickets-created.component';
import { VenteService } from '../../../Service/VenteService';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../apps/loader/loader.service';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { VenteFilterComponent } from '../../../common/filters/vente-filter/vente-filter.component';

@Component({
  selector: 'app-vente-ca-global',
  imports: [
    ReactiveFormsModule,
    TicketsOpenComponent,
    MatFormFieldModule,
    MatSelectModule,
    TicketsInProgressComponent,
    TicketsClosedComponent,
    MatInputModule,CommonModule,
    MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,MatProgressSpinner,
     MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
      MatNativeDateModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,VenteFilterComponent,
      NgxMaterialTimepickerModule],
  templateUrl: './vente-ca-global.component.html',
  styleUrl: './vente-ca-global.component.scss'
})
export class VenteCaGlobalComponent {
  data: []=[];

  errorMessage: string = '';
  CAGlobal: any;
  caht: any;
  cattc: any;
  doc: any;
  isLoading: boolean = false;
  
   constructor(private venteService: VenteService,private loadingService: LoaderService) { 

  }

 loadCA(filtre: any): void {
 const dateDebut = filtre.dateDebut.toISOString().split('T')[0];
  const dateFin = filtre.dateFin.toISOString().split('T')[0];
  const inclureBLs = filtre.inclureBLs ? 'true' : 'false';
  const mode = filtre.dateFacture ? 'dateFacture' : (filtre.dateBL ? 'dateBL' : 'dateFacture');


  this.isLoading = true; 
  this.venteService.getCAGlobal(dateDebut, dateFin, mode, inclureBLs)
    .pipe(finalize(() => this.loadingService.hide())) // proprement
    .subscribe({
      next: (data) => {
        this.CAGlobal = data;
        console.log(this.CAGlobal[0]);
          this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du CA Global', error);
        this.errorMessage = 'Erreur lors du chargement du CA Global';
          this.isLoading = false;
      }
    });
}


}
    




