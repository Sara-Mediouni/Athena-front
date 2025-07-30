import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import jsPDF from 'jspdf';

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
                const toolbarColor = isDarkMode ? 'white' : 'red';

                const seriesDatattc = this.data.map(item => item.cattc);
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
                       ...(this.data.length > 30 && { width: this.data.length * 50 }),
                        type: "bar",
                        zoom: {
                            enabled: true,
                            type: 'x',
                            resetIcon: {
                                offsetX: -10,
                                offsetY: 0,
                                fillColor: '#fff',
                                strokeColor: '#37474F'
                            },
                            selection: {
                                background: '#90CAF9',
                                border: '#0D47A1'
                            }
                        },
                        height: 350,
                        toolbar: {
                            show: true,
                            tools: {
                                download: true,
                                customIcons: [
                                    {
                                        icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${toolbarColor}"
>
        <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM14 3.5V9h5.5L14 3.5zM8 17h2v-1H8v1zm0-3h2v-1H8v1zm0-3h6v-1H8v1z"/>
      </svg>`, index: 1,
                                        title: 'Télécharger PDF',
                                        click: () => {
                                            if (!this.chartInstance) {
                                                console.error('Chart not initialized.');
                                                return;
                                            }
                                            this.chartInstance.dataURI().then(({ imgURI }: { imgURI: string }) => {
                                                const width = this.chartInstance.w.globals.svgWidth / 2 || 400;
                                                const height = this.chartInstance.w.globals.svgHeight / 2 || 400;
                                                const pdf = new jsPDF({
                                                    orientation: 'landscape',
                                                    unit: 'px',
                                                    format: [width, height]
                                                });
                                                pdf.addImage(imgURI, 'PNG', 0, 0, width, height);
                                                pdf.save('chart.pdf');
                                            });
                                        }
                                    }
                                ]


                            }
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
                          tickPlacement: 'on',
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
                        min: 0, 
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
                            formatter: function (val: any) {
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
                            formatter: function (val: any) {
                                return val.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

                            }
                        }
                    },
                    legend: {
                        show: true,
                        offsetY: 5,
                        fontSize: '14px',
                        position: "bottom",
                        marginTop: "30px",
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