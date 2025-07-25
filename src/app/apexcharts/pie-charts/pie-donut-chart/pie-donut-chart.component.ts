import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieDonutChartService } from './pie-donut-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-pie-donut-chart',
    imports: [MatCardModule],
    templateUrl: './pie-donut-chart.component.html',
    styleUrl: './pie-donut-chart.component.scss',
    standalone: true
})
export class PieDonutChartComponent {
     private destroy$ = new Subject<void>();
     private currentTheme: boolean = false;
     private hasLoadedData = false;
     @Input() data: any[] = [];

    constructor(
        private pieDonutChartService: PieDonutChartService,
        private customizer: CustomizerSettingsService
    ) {
          this.customizer.darkTheme$
                      .pipe(takeUntil(this.destroy$))
                      .subscribe(isDark => {
                        this.currentTheme = isDark;
                        if (this.hasLoadedData) {
                        this.pieDonutChartService.loadChart(isDark);}
                     });
    }
   
    ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.pieDonutChartService.setData(this.data);
      this.hasLoadedData = true;

      // Charger directement avec le thème courant, sans nouvel abonnement
      this.pieDonutChartService.loadChart(this.currentTheme);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}