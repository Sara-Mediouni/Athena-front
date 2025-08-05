import { Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LineColumnChartService } from './line-column-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-line-column-chart',
    imports: [MatCardModule],
    templateUrl: './line-column-chart.component.html',
    styleUrl: './line-column-chart.component.scss'
})
export class LineColumnChartComponent {
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
        private lineColumnAreaService:LineColumnChartService,
                private customizer: CustomizerSettingsService
        
    ) {
           this.customizer.darkTheme$
                              .pipe(takeUntil(this.destroy$))
                              .subscribe(isDark => {
                                this.currentTheme = isDark;
                                if (this.hasLoadedData) {this.lineColumnAreaService.loadChart(isDark);   }
              });
    }

ngOnChanges(changes: SimpleChanges): void {
    if (changes['data1'] && this.data1 && this.data1.length > 0) {
      this.lineColumnAreaService.setData1(this.data1);}
      if (changes['data2'] && this.data2 && this.data2.length > 0) {
      this.lineColumnAreaService.setData2(this.data2);
   }
    if (changes['start1'] && this.start1 && this.start1.length > 0) {
      this.lineColumnAreaService.setStart1(this.start1);
   }
    if (changes['start2'] && this.start2 && this.start2.length > 0) {
      this.lineColumnAreaService.setStart2(this.start2);
   }
    if (changes['end1'] && this.end1 && this.end1.length > 0) {
      this.lineColumnAreaService.setEnd1(this.end1);
   }
   if (changes['end2'] && this.end2 && this.end2.length > 0) {
      this.lineColumnAreaService.setEnd2(this.end2);
   }
    if (changes['CAHT'] && this.CAHT && this.CAHT.length > 0) {
      this.lineColumnAreaService.setCAHT(this.CAHT);
   }
     if (changes['CATTC'] && this.CATTC && this.CATTC.length > 0) {
      this.lineColumnAreaService.setCATTC(this.CATTC);
   }
    if ((this.data1 && this.data1.length > 0) || (this.data2 && this.data2.length > 0)) {
      this.hasLoadedData = true;
    
      // Charger directement avec le thème courant, sans nouvel abonnement
      this.lineColumnAreaService.loadChart(this.currentTheme);}
    }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}