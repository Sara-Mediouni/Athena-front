import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Injectable({
    providedIn: 'root'
})
export class BasicColumnChartService {
    private chartInstance: any = null;
      @Input() data: any[] = [];
    private isBrowser: boolean;
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
                 
            
                const seriesDatattc=this.data.map(item => item.cattc);
                const seriesData = this.data.map(item => item.caht);
                console.log(seriesData);
                console.log(seriesDatattc)
                // Define chart options
                const options = {
                    series: [
                        {
                            name: "HT",
                            data: seriesData
                        },
                        
                        {
                            name: "TTC",
                            data: seriesDatattc
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 350,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#0f79f3", "#ffb264"
                    ],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: "55%",
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 3,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: categories,
                        axisBorder: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        axisTicks: {
                            show: true,
                            color: '#e0e0e0'
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "12px"
                            }
                        }
                    },
                    yaxis: {
                        title: {
                            text: "TND (thousands)",
                            style: {
                                color: "#475569",
                                fontSize: "14px",
                                fontWeight: 500
                            }
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            },
                                formatter: function(val:any) {
                                 return val.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
                                
                            }
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                 return val.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
                                
                            }
                        }
                    },
                    legend: {
                        show: true,
                        offsetY: 5,
                        fontSize: '14px',
                        position: "bottom",
                        marginTop:"30px",
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
                        borderColor: "#e0e0e0"
                    }
                };

                // Initialize and render the chart
                this.chartInstance = new ApexCharts(document.querySelector('#basic_column_chart'), options);
               this.chartInstance.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}