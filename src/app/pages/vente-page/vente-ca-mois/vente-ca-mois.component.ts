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

@Component({
  selector: 'app-vente-ca-mois',
  imports: [
    ReactiveFormsModule,
    BasicLineChartComponent,
    TicketsOpenComponent,
    NewTicketsCreatedComponent,
    MatFormFieldModule,
    MatSelectModule,
    TicketsInProgressComponent,
    TicketsClosedComponent,
    MatInputModule,
    MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,
     MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
      MatNativeDateModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
      NgxMaterialTimepickerModule],
  templateUrl: './vente-ca-mois.component.html',
  styleUrl: './vente-ca-mois.component.scss'
})
export class VenteCaMoisComponent {
  data: []=[];
  form: FormGroup;
  errorMessage: string = '';
  CAGlobal: any;
  
   constructor(private fb: FormBuilder,private venteService: VenteService) { 
    const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); // 1er janvier de l'année en cours

 

  this.form = this.fb.group({
    dateFacture: [true],
    dateBL: [false],
    inclureBLs: [false],
    dateDebut: [startOfYear],
    dateFin: [now],

  });
    
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

  const dateDebut = formValues.dateDebut.toISOString().split('T')[0]; // format YYYY-MM-DD
  const dateFin = formValues.dateFin.toISOString().split('T')[0];
  const inclureBLs = formValues.inclureBLs ? 'true' : 'false';
  const mode = formValues.dateFacture ? 'dateFacture' : (formValues.dateBL ? 'dateBL' : 'dateFacture'); 

  
}

   
    


}

