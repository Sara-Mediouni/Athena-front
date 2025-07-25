import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Injectable({
    providedIn: 'root'
})
export class PieDonutChartService {
     private chartInstance: any = null;
    private isBrowser: boolean;
    @Input() data: any[] = [];
    constructor(@Inject(PLATFORM_ID) private platformId: any,
        private customizer: CustomizerSettingsService) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
     setData(data: any[]) {
        this.data = data;
    }
    async loadChart(isDarkMode: boolean): Promise<void> {
            const labelColor = isDarkMode ? '#fff' : '#000';
       if (!this.isBrowser || !this.data || this.data.length === 0) {
            console.warn('Aucune donnée disponible ou environnement serveur');
            return;
        }
         if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
    }
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;
                const categories = this.data.map(item => item.label);
                
                const seriesData = this.data.map(item => item.caht);
                // Define chart options
                const options = {
                    series: seriesData,
                    chart: {
                        type: "donut"
                    },
                    labels: categories,
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ],
                    legend: {
                        offsetY: 0,
                        fontSize: "14px",
                        labels: {
                            colors: '#919aa3'
                        },
                        itemMargin: {
                            horizontal: 0,
                            vertical: 5
                        }
                    },
                    stroke: {
                        width: 0,
                        show: true
                    },
                    colors: [
                        // "#0f79f3", "#796df6", "#e74c3c", "#00cae3", "#ffb264"
                    ],
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '14px',
                        },
                        
                        dropShadow: {
                            enabled: false
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                return val + "TND";
                            }
                        }
                    }
                };

                // Initialize and render the chart
                this.chartInstance = new ApexCharts(document.querySelector('#pie_donut_chart'), options);
               this.chartInstance.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}