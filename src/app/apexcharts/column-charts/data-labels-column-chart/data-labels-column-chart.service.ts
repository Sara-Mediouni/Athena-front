import { Injectable, Inject, PLATFORM_ID, Input, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DataLabelsColumnChartService {
    private isBrowser: boolean;
    private chart: any;

    // Données à injecter (ton JSON)
    @Input() data: any[] = [];
   

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
  
       setData(data: any[]) {
        this.data = data;
    }

    async loadChart(): Promise<void> {
          if (!this.isBrowser || !this.data || this.data.length === 0) {
            console.warn('Aucune donnée disponible ou environnement serveur');
            return;
        }
       

        try {
            const ApexCharts = (await import('apexcharts')).default;
console.log('Données reçues dans loadChart:', this.data);

            // Préparation des catégories (labels)
            const categories = this.data.map(item => item.label);
            console.log('Categories:', categories);

            // Préparation des valeurs, par ex. caht (chiffre d'affaires HT)
            const seriesData = this.data.map(item => item.caht);
            console.log('Series Data:', seriesData);

            const options = {
                series: [
                    {
                        name: "CA HT",
                        data: seriesData
                    }
                ],
                chart: {
                    height: 350,
                    type: "bar",
                    toolbar: { show: true }
                },
                plotOptions: {
                    bar: {
                        dataLabels: { position: "top" }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: (val: number) => val.toLocaleString('fr-FR', { style: 'currency', currency: 'TND' }),
                    offsetY: -25,
                    style: { fontSize: "12px", colors: ["#304758"] }
                },
                xaxis: {
                    categories,
                    position: "bottom",
                    labels: { show: true, style: { colors: "#919aa3", fontSize: "14px" } },
                    axisBorder: { show: false, color: '#e0e0e0' },
                    axisTicks: { show: true, color: '#e0e0e0' },
                    crosshairs: {
                        fill: {
                            type: "gradient",
                            gradient: {
                                colorFrom: "#D8E3F0",
                                colorTo: "#BED1E6",
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5
                            }
                        }
                    },
                    tooltip: { enabled: true, offsetY: -35 }
                },
                colors: ["#0f79f3"],
                yaxis: {
                    labels: {
                        formatter: (val: number) => val.toLocaleString('fr-FR', { style: 'currency', currency: 'TND' }),
                        style: { colors: "#919aa3", fontSize: "14px" }
                    },
                    axisBorder: { show: false },
                    axisTicks: { show: false }
                },
                title: {
                    text: "Chiffre d'affaires HT par période",
                    align: "left",
                    offsetX: -9,
                    style: { fontWeight: '500', fontSize: '15px', color: '#475569' }
                },
                grid: {
                    show: true,
                    strokeDashArray: 5,
                    borderColor: "#e0e0e0"
                }
            };

            // Si un chart est déjà rendu, le détruire avant de recréer
            if(this.chart) {
                this.chart.destroy();
            }

            this.chart = new ApexCharts(document.querySelector('#data_labels_column_chart'), options);
            this.chart.render();

        } catch (error) {
            console.error('Error loading ApexCharts:', error);
        }
    }
}
