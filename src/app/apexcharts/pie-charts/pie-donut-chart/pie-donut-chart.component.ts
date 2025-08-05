import { Component, Input, SimpleChanges, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieDonutChartService } from './pie-donut-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-pie-donut-chart',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './pie-donut-chart.component.html',
  styleUrl: './pie-donut-chart.component.scss'
})
export class PieDonutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  private destroy$ = new Subject<void>();
  private currentTheme: boolean = false;
  private hasLoadedData = false;
  private viewInitialized = false;
  @Input() data: any[] = [];

  constructor(
    private pieDonutChartService: PieDonutChartService,
    private customizer: CustomizerSettingsService
  ) {
    this.customizer.darkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.currentTheme = isDark;
        if (this.hasLoadedData && this.viewInitialized) {
          this.pieDonutChartService.loadChart(isDark);
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.hasLoadedData) {
      this.pieDonutChartService.loadChart(this.currentTheme);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.pieDonutChartService.setData(this.data);
      this.hasLoadedData = true;
      console.log(this.data);

      if (this.viewInitialized) {
        this.pieDonutChartService.loadChart(this.currentTheme);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
