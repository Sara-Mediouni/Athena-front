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


@Component({
  selector: 'app-vente-ca-periode',
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    
    MatInputModule,CommonModule,
    DataLabelsColumnChartComponent,
    MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,
     MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
      MatNativeDateModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
      NgxMaterialTimepickerModule],
  templateUrl: './vente-ca-periode.component.html',
  styleUrl: './vente-ca-periode.component.scss'
})
export class VenteCaPeriodeComponent {
    @Output() groupByChange = new EventEmitter<string>();

  
  data: []=[];
  form: FormGroup;
  errorMessage: string = '';
  CAGlobal: any;
  
  doc: any;
  
   constructor(private fb: FormBuilder,private venteService: VenteService) { 
    const now = new Date();
  const startOfYear = new Date(2021, 0, 1); // 1er janvier de l'année en cours
  const endOfYear = new Date(2022, 0, 1);
 

  this.form = this.fb.group({
    dateFacture: [true],
    dateBL: [false],
    inclureBLs: [false],
    dateDebut: [startOfYear],
    dateFin: [endOfYear],
    groupBy: ['mois'] // Vous pouvez ajuster cette valeur selon vos besoins

  });
    
  }
  changeGroupBy(groupBy: string): void {
    this.groupByChange.emit(groupBy);
  }
 ngOnInit(): void {
  this.loadCA();
  this.form.get('dateFacture')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('dateBL')?.setValue(false, { emitEvent: false });
    }
  });

  this.form.get('dateBL')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('dateFacture')?.setValue(false, { emitEvent: false });
    }
  });
}
  onSubmit(): void {
    if (this.form.valid) {
    this.loadCA(); 
  }
  }
  loadCA(): void {
  const formValues = this.form.value;
  console.log('formValues.dateDebut:', formValues.dateDebut);
console.log('formValues.dateFin:', formValues.dateFin);

  const dateDebut = formValues.dateDebut.toISOString().split('T')[0]; // format YYYY-MM-DD
  const dateFin = formValues.dateFin.toISOString().split('T')[0];
  const inclureBLs = formValues.inclureBLs ? 'true' : 'false';
  const mode = formValues.dateFacture ? 'dateFacture' : (formValues.dateBL ? 'dateBL' : 'dateFacture'); 
  const groupBy = formValues.groupBy ; // Vous pouvez ajuster cette valeur selon vos besoins
  console.log('Mode sélectionné:', mode);
  console.log('Date de début:', dateDebut);
  console.log('Date de fin:', dateFin);
  console.log('Inclure BLs:', inclureBLs);
  this.venteService.getCAPeriod(dateDebut, dateFin, mode, inclureBLs,groupBy).subscribe({
    next: (data) => {
      this.CAGlobal = data;
      console.log(this.CAGlobal);
    },
    error: (error) => {
      console.error('Erreur lors du chargement du CA Global', error);
      this.errorMessage = 'Erreur lors du chargement du CA Global';
    }
  });
}

}
    






