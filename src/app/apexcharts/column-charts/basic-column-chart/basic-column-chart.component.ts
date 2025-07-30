import { Component, Input, SimpleChanges, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BasicColumnChartService } from './basic-column-chart.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-basic-column-chart',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './basic-column-chart.component.html',
    styleUrl: './basic-column-chart.component.scss'
})
export class BasicColumnChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: any[] = [];

  private destroy$ = new Subject<void>();
  private currentTheme: boolean = false;
  private hasLoadedData = false;
  private viewInitialized = false;

  constructor(
    private basicColumnChartService: BasicColumnChartService,
    private customizer: CustomizerSettingsService
  ) {
    this.customizer.darkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.currentTheme = isDark;
        if (this.hasLoadedData && this.viewInitialized) {
          this.basicColumnChartService.loadChart(isDark);
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.hasLoadedData) {
      this.basicColumnChartService.loadChart(this.currentTheme);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      this.basicColumnChartService.setData(this.data);
      this.hasLoadedData = true;

      if (this.viewInitialized) {
        this.basicColumnChartService.loadChart(this.currentTheme);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
