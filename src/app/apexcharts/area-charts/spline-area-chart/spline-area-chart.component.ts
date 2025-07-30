import { Component, Input, SimpleChanges, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SplineAreaChartService } from './spline-area-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-spline-area-chart',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './spline-area-chart.component.html',
  styleUrl: './spline-area-chart.component.scss'
})
export class SplineAreaChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data1: any[] = [];
  @Input() data2: any[] = [];

  private destroy$ = new Subject<void>();
  private currentTheme: boolean = false;
  private hasLoadedData = false;
  private viewInitialized = false;

  constructor(
    private splineAreaChartService: SplineAreaChartService,
    private customizer: CustomizerSettingsService
  ) {
    this.customizer.darkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.currentTheme = isDark;
        if (this.hasLoadedData && this.viewInitialized) {
          this.splineAreaChartService.loadChart(isDark);
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.hasLoadedData) {
      this.splineAreaChartService.loadChart(this.currentTheme);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let hasNewData = false;

    if (changes['data1'] && this.data1 && this.data1.length > 0) {
      this.splineAreaChartService.setData1(this.data1);
      hasNewData = true;
    }

    if (changes['data2'] && this.data2 && this.data2.length > 0) {
      this.splineAreaChartService.setData2(this.data2);
      hasNewData = true;
    }

    if (hasNewData) {
      this.hasLoadedData = true;
      if (this.viewInitialized) {
        this.splineAreaChartService.loadChart(this.currentTheme);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
