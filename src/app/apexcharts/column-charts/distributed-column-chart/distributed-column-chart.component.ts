import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DistributedColumnChartService } from './distributed-column-chart.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-distributed-column-chart',
  imports: [MatCardModule],
  templateUrl: './distributed-column-chart.component.html',
  styleUrl: './distributed-column-chart.component.scss'
})
export class DistributedColumnChartComponent implements OnChanges, OnDestroy {
  @Input() data: any[] = [];
  private destroy$ = new Subject<void>();
  private currentTheme: boolean = false;
  private hasLoadedData = false;

  constructor(
    private distributedColumnChartService: DistributedColumnChartService,
    private customizer: CustomizerSettingsService
  ) {
     this.customizer.darkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.currentTheme = isDark;
        if (this.hasLoadedData) {
          this.distributedColumnChartService.loadChart(isDark);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.distributedColumnChartService.setData(this.data);
      this.hasLoadedData = true;

       this.distributedColumnChartService.loadChart(this.currentTheme);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
