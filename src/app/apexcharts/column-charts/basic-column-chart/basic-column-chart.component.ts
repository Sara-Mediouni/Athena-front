import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BasicColumnChartService } from './basic-column-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-basic-column-chart',
    imports: [MatCardModule],
    templateUrl: './basic-column-chart.component.html',
    styleUrl: './basic-column-chart.component.scss'
})
export class BasicColumnChartComponent {
@Input() data: any[] = [];
  private destroy$ = new Subject<void>();
  private currentTheme: boolean = false;
  private hasLoadedData = false;

    constructor(
        private basicColumnChartService: BasicColumnChartService,
        private customizer: CustomizerSettingsService
    
    ) {
         this.customizer.darkTheme$
              .pipe(takeUntil(this.destroy$))
              .subscribe(isDark => {
                this.currentTheme = isDark;
                if (this.hasLoadedData) {
             this.basicColumnChartService.loadChart(isDark);      
        }
              });
    }

     ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.basicColumnChartService.setData(this.data);
      this.hasLoadedData = true;

      // Charger directement avec le thème courant, sans nouvel abonnement
      this.basicColumnChartService.loadChart(this.currentTheme);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}