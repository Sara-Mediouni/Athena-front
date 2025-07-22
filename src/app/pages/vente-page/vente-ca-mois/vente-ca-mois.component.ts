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

@Component({
  selector: 'app-vente-ca-mois',
  imports: [
    ReactiveFormsModule,
    BasicLineChartComponent,
    MatFormFieldModule,
    MatSelectModule,
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
   constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      year: [new Date().getFullYear()],
      entreprise: ['Entreprise A']
    });
  }
   ngOnInit(): void {
    this.loadData();
    
    // On reload les données à chaque changement de filtre
    this.form.valueChanges.subscribe(() => this.loadData());
  }
  loadData() {
  const mois = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

}

}

