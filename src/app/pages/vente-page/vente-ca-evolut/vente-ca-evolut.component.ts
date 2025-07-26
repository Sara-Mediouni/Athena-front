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
  CAGlobal: any;
  isLoading: boolean = false;
startDate: Date = new Date(2020, 0, 1); // Janvier 2020
endDate: Date = new Date(2030, 0, 1);   // Janvier 2030
  constructor(private fb: FormBuilder, private venteService: VenteService) {
    const now = new Date();
    const startOfYear = new Date(2021, 0, 1); // 1er janvier de l'année en cours
    const endOfYear = new Date(2022, 0, 1);


    this.form = this.fb.group({
      dateFacture: [true],
      dateBL: [false],
      inclureBLs: [false],
      dateDebut: [this.startDate],
      dateFin: [this.endDate],
      groupBy: ['mois'] // Vous pouvez ajuster cette valeur selon vos besoins

    });


  }
  ngOnInit() {
  const debut = this.form.get('dateDebut')?.value;
  const fin = this.form.get('dateFin')?.value;

  this.startDate = debut ? new Date(debut) : new Date();
  this.endDate = fin ? new Date(fin) : new Date();
}
 chooseYear(normalizedYear: moment.Moment, controlName: string, picker: any): void {
  const ctrl = this.form.get(controlName);
  if (ctrl) {
    const selected = moment({ year: normalizedYear.year(), month: 0, day: 1 });
    ctrl.setValue(selected);
  }
  picker.close();
}


}
