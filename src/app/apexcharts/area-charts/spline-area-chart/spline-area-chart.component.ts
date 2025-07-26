import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SplineAreaChartService } from './spline-area-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-spline-area-chart',
    imports: [MatCardModule],
    templateUrl: './spline-area-chart.component.html',
    styleUrl: './spline-area-chart.component.scss'
})
export class SplineAreaChartComponent {
    @Input() data1: any[] = [];
    @Input() data2: any[] = [];
     private destroy$ = new Subject<void>();
      private currentTheme: boolean = false;
      private hasLoadedData = false;
    constructor(
        private splineAreaChartService: SplineAreaChartService
        ,private customizer: CustomizerSettingsService
    ) {
           this.customizer.darkTheme$
                      .pipe(takeUntil(this.destroy$))
                      .subscribe(isDark => {
                        this.currentTheme = isDark;
                        if (this.hasLoadedData) {
                             this.splineAreaChartService.loadChart(isDark);
        }
              });
    }

 
           ngOnChanges(changes: SimpleChanges): void {
    if (changes['data1'] && this.data1 && this.data1.length > 0) {
      this.splineAreaChartService.setData1(this.data1);}
      if (changes['data2'] && this.data2 && this.data2.length > 0) {
      this.splineAreaChartService.setData2(this.data2);
    console.log('Data1:', this.data1);
    console.log('Data2:', this.data2);}
    if ((this.data1 && this.data1.length > 0) || (this.data2 && this.data2.length > 0)) {
      this.hasLoadedData = true;
    
      // Charger directement avec le thème courant, sans nouvel abonnement
      this.splineAreaChartService.loadChart(this.currentTheme);}
    }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}