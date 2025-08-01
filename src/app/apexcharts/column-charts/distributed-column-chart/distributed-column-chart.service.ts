import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Injectable({
    providedIn: 'root'
})
export class DistributedColumnChartService {
   
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
                
                const ApexCharts = (await import('apexcharts')).default;
                 const categories = this.data.map(item => item.label);
                 
            

            const seriesData = this.data.map(item => item.caht);
                
                const options = {
                    series: [
                        {
                            name: "distibuted",
                             data: seriesData
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "bar",
                        events: {
                            click: function(chart:any, w:any, e:any) {
                               
                            }
                        }
                    },
                    colors: [
                        "#0f79f3",
                        "#796df6",
                        "#00cae3",
                        "#ffb264",
                        "#2ed47e",
                        "#e74c3c",
                        "#26a69a",
                        "#d10ce8"
                    ],
                    plotOptions: {
                        bar: {
                            columnWidth: "45%",
                            distributed: true
                        }
                    },
                   dataLabels: {
    enabled: true,
    formatter: function (val: number) {
        return val.toFixed(3); 
    },
    style: {
        fontSize: '10px',
        colors: [labelColor] 
    },
    offsetY: -10 
}
,
                    legend: {
                        offsetY: 5,
                        show: false,
                        fontSize: '14px',
                        position: "bottom",
                        horizontalAlign: "center",
                        labels: {
                            colors: "#919aa3"
                        },
                        itemMargin: {
                            horizontal: 10,
                            vertical: 5
                        }
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0",
                        row: {
                            colors: ["#f4f6fc", "transparent"],  
                            opacity: 0.5
                        }
                    },
                    xaxis: {
                        categories,
                        labels: {
                            show: true,
                            style: {
                                colors: [
                                    "#0f79f3",
                                    "#796df6",
                                    "#00cae3",
                                    "#ffb264",
                                    "#2ed47e",
                                    "#e74c3c",
                                    "#26a69a",
                                    "#d10ce8"
                                ],
                                fontSize: "12px"
                            }
                        },
                        axisBorder: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        axisTicks: {
                            show: true,
                            color: '#e0e0e0'
                        }
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            },
                             formatter: function (value:any) {
                             return value.toFixed(3); 
    }
                        },
                        axisBorder: {
                            show: false
                        }
                    }
                };

                this.chartInstance = new ApexCharts(document.querySelector('#distributed_column_chart'), options);
               this.chartInstance.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}