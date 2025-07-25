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

@Component({
  selector: 'app-vente-ca-evolut',
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

  doc: any;
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
}
