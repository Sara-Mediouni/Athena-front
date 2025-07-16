import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GradientLineChartService } from './gradient-line-chart.service';

@Component({
    selector: 'app-gradient-line-chart',
    standalone:true,
    imports: [MatCardModule],
    templateUrl: './gradient-line-chart.component.html',
    styleUrl: './gradient-line-chart.component.scss'
})
export class GradientLineChartComponent {

    constructor(
        private gradientLineChartService: GradientLineChartService
    ) {}

    ngAfterViewInit(): void {
    this.gradientLineChartService.loadChart();
  }

}