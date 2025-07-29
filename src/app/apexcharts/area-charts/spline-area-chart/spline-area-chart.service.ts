import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import jsPDF from 'jspdf';

@Injectable({
    providedIn: 'root'
})
export class SplineAreaChartService {
    private chartInstance: any = null;
    @Input() data1: any[] = [];
    @Input() data2: any[] = [];
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    alignDatasets(data1: any[], data2: any[]) {
        // 1. Crée un set unique de labels
        const allLabels = Array.from(new Set([...data1.map(d => d.label), ...data2.map(d => d.label)]));
        allLabels.sort(); // Optionnel : trie les labels (utile pour les mois ou années)

        // 2. Crée un Map rapide pour chaque dataset
        const map1 = new Map(data1.map(d => [d.label, d.cattc]));
        const map2 = new Map(data2.map(d => [d.label, d.cattc]));

        // 3. Reconstitue les séries alignées
        const aligned1 = allLabels.map(label => map1.get(label) ?? 0);
        const aligned2 = allLabels.map(label => map2.get(label) ?? 0);
        console.log('Aligned Data1:', aligned1);
        console.log('Aligned Data2:', aligned2);

        return {
            categories: allLabels,
            seriesData1: aligned1,
            seriesData2: aligned2
        };
    }

    setData1(data: any[]) {
        this.data1 = data;
    }
    setData2(data: any[]) {
        this.data2 = data;
    }
    async loadChart(isDarkMode: boolean): Promise<void> {
        if (!this.isBrowser || !this.data1 || this.data1.length === 0) {
            console.warn('Aucune donnée disponible ou environnement serveur');
            return;
        }
        if (this.chartInstance) {
            this.chartInstance.destroy();
            this.chartInstance = null;
        }
        if (this.isBrowser) {
            try {
                const toolbarColor = isDarkMode ? 'white' : 'red';

                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;
                const { categories, seriesData1, seriesData2 } = this.alignDatasets(this.data1, this.data2);

                // Define chart options
                const options = {
                    series: [
                        {
                            name: "Year 1",
                            data: seriesData1
                        },
                        {
                            name: "Year 2",
                            data: seriesData2
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "area",
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
      </svg>`, 
                                        index: 1,
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
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "smooth"
                    },
                    colors: [
                        "#796df6", "#0f79f3"
                    ],
                    xaxis: {
                        type: "datetime",
                        categories:
                            categories,
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
                                fontSize: "14px"
                            },
                        }
                    },
                    tooltip: {
                        x: {
                            format: "dd/MM/yy"
                        },
                        y: {
                            formatter: function (val: any) {
                                return val.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

                            }
                        }
                    },
                    yaxis: {
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
                    legend: {
                        show: true,
                        fontSize: '14px',
                        labels: {
                            colors: "#919aa3"
                        },
                        itemMargin: {
                            horizontal: 10,
                            vertical: 0
                        }
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0"
                    }
                };

                // Initialize and render the chart
                this.chartInstance = new ApexCharts(document.querySelector('#spline_area_chart'), options);
                this.chartInstance.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}