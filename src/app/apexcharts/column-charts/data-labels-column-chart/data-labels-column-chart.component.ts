import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataLabelsColumnChartService } from './data-labels-column-chart.service';

@Component({
    selector: 'app-data-labels-column-chart',
    imports: [MatCardModule],
    templateUrl: './data-labels-column-chart.component.html',
    styleUrl: './data-labels-column-chart.component.scss'
})
export class DataLabelsColumnChartComponent {
 @Input() data: any[] = [];

    constructor(private chartService: DataLabelsColumnChartService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && this.data && this.data.length > 0) {
            this.chartService.setData(this.data); 
            this.chartService.loadChart();
        }
    }}