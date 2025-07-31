import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LineAreaChartService } from './line-area-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-line-area-chart',
    imports: [MatCardModule],
    templateUrl: './line-area-chart.component.html',
    styleUrl: './line-area-chart.component.scss'
})
export class LineAreaChartComponent {
  @Input() data1: any[] = [];
  @Input() data2: any[] = [];
  @Input() start1: any[] = [];
  @Input() start2: any[] = [];
  @Input() end1: any[] = [];
  @Input() end2: any[] = [];
  @Input() CAHT:any;
  @Input() CATTC:any;
     private destroy$ = new Subject<void>();
      private currentTheme: boolean = false;
      private hasLoadedData = false;
    constructor(
        private lineAreaChartService: LineAreaChartService
                ,private customizer: CustomizerSettingsService
        
    ) {
           this.customizer.darkTheme$
                              .pipe(takeUntil(this.destroy$))
                              .subscribe(isDark => {
                                this.currentTheme = isDark;
                                if (this.hasLoadedData) {this.lineAreaChartService.loadChart(isDark);   }
              });
    }

ngOnChanges(changes: SimpleChanges): void {
    if (changes['data1'] && this.data1 && this.data1.length > 0) {
      this.lineAreaChartService.setData1(this.data1);}
      if (changes['data2'] && this.data2 && this.data2.length > 0) {
      this.lineAreaChartService.setData2(this.data2);
   }
    if (changes['start1'] && this.start1 && this.start1.length > 0) {
      this.lineAreaChartService.setStart1(this.start1);
   }
    if (changes['start2'] && this.start2 && this.start2.length > 0) {
      this.lineAreaChartService.setStart2(this.start2);
   }
    if (changes['end1'] && this.end1 && this.end1.length > 0) {
      this.lineAreaChartService.setEnd1(this.end1);
   }
   if (changes['end2'] && this.end2 && this.end2.length > 0) {
      this.lineAreaChartService.setEnd2(this.end2);
   }
    if (changes['CAHT'] && this.CAHT && this.CAHT.length > 0) {
      this.lineAreaChartService.setCAHT(this.CAHT);
   }
     if (changes['CATTC'] && this.CATTC && this.CATTC.length > 0) {
      this.lineAreaChartService.setCATTC(this.CATTC);
   }
    if ((this.data1 && this.data1.length > 0) || (this.data2 && this.data2.length > 0)) {
      this.hasLoadedData = true;
    
      // Charger directement avec le thème courant, sans nouvel abonnement
      this.lineAreaChartService.loadChart(this.currentTheme);}
    }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}