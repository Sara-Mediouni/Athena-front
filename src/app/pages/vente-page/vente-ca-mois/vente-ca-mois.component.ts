import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BasicLineChartComponent } from '../../../apexcharts/line-charts/basic-line-chart/basic-line-chart.component';

@Component({
  selector: 'app-vente-ca-mois',
  imports: [
    ReactiveFormsModule,
    BasicLineChartComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,],
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

