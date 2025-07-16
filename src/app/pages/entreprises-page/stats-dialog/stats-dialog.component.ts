import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { GradientLineChartComponent } from '../../../apexcharts/line-charts/gradient-line-chart/gradient-line-chart.component';
@Component({
  selector: 'app-stats-dialog',
  templateUrl: './stats-dialog.component.html',
  imports: [CommonModule,MatDialogModule,GradientLineChartComponent],

})
export class StatsDialogComponent {
  entreprise: any;
  type: string;
  title: string = '';
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.entreprise = dialogData.entreprise;
    this.type = dialogData.type;

    // Choix du titre
    switch (this.type) {
      case 'clients':
        this.title = 'CA par client';
        this.data = [
          { client: 'Client A', montant: 3400 },
          { client: 'Client B', montant: 2200 },
        ];
        break;
      case 'articles':
        this.title = 'CA par article';
        this.data = [
          { article: 'Produit X', montant: 8000 },
          { article: 'Produit Y', montant: 5000 },
        ];
        break;
      case 'global':
        this.title = 'Statistiques globales';
        this.data = {
          caTotal: 150000,
          nbFactures: 42,
          topClient: 'Client A',
        };
        break;
    }
  }
}
