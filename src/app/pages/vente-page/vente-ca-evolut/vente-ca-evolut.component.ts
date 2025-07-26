import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BasicColumnChartComponent } from '../../../apexcharts/column-charts/basic-column-chart/basic-column-chart.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { VenteService } from '../../../Service/VenteService';
import { SplineAreaChartComponent } from '../../../apexcharts/area-charts/spline-area-chart/spline-area-chart.component';
import moment from 'moment';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const YEAR_ONLY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-vente-ca-evolut',
  standalone: true,
  providers: [
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: YEAR_ONLY_FORMATS }
],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule, CommonModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
    MatProgressSpinner, SplineAreaChartComponent,
    NgxMaterialTimepickerModule],
  templateUrl: './vente-ca-evolut.component.html',
  styleUrl: './vente-ca-evolut.component.scss'
})
export class VenteCaEvolutComponent {
  
  data: [] = [];
  form: FormGroup;
  errorMessage: string = '';
  CAGlobal1: any;
  CAGlobal2: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private venteService: VenteService) {
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
  ngOnInit() {
this.loadBothYears();
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
 chooseYear(normalizedYear: moment.Moment, controlName: string, picker: any): void {
  const ctrl = this.form.get(controlName);
  if (ctrl) {
    const selected = moment({ year: normalizedYear.year(), month: 0, day: 1 });
    ctrl.setValue(selected);
  }
  picker.close();
}



onSubmit(): void {
  if (this.form.valid) {
    this.loadBothYears();
  }
}

loadBothYears(): void {
  const formValues = this.form.value;

  const year1 = formValues.dateDebut.getFullYear();
  const year2 = formValues.dateFin.getFullYear();

  const dateDebut1 = moment({ year: year1, month: 0, day: 1 }).format('YYYY-MM-DD');
  const dateFin1 = moment({ year: year1, month: 11, day: 31 }).format('YYYY-MM-DD');

  const dateDebut2 = moment({ year: year2, month: 0, day: 1 }).format('YYYY-MM-DD');
  const dateFin2 = moment({ year: year2, month: 11, day: 31 }).format('YYYY-MM-DD');

  const inclureBLs = formValues.inclureBLs ? 'true' : 'false';
  const mode = formValues.dateFacture ? 'dateFacture' : (formValues.dateBL ? 'dateBL' : 'dateFacture');
  const groupBy = "mois";

  this.isLoading = true;

  forkJoin([
    this.venteService.getCAPeriod(dateDebut1, dateFin1, mode, inclureBLs, groupBy),
    this.venteService.getCAPeriod(dateDebut2, dateFin2, mode, inclureBLs, groupBy)
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



}
