import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import jsPDF from 'jspdf';

@Injectable({
    providedIn: 'root'
})
export class LineColumnChartService {

    private isBrowser: boolean;
    private chartInstance: any = null;
    data1: any[] = [];
    data2: any[] = [];
    CAHT: any;
    CATTC: any;
    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    alignDatasets(data1: any[], data2: any[]) {

        const allLabels = Array.from(new Set([...data1.map(d => d.label), ...data2.map(d => d.label)]));


        allLabels.sort((a, b) => a.localeCompare(b));


        let map1: Map<string, number>;
        let map2: Map<string, number>;

        if (this.CATTC === 'true') {
            map1 = new Map(data1.map(d => [d.label, d.cattc]));
            map2 = new Map(data2.map(d => [d.label, d.cattc]));
        } else {
            map1 = new Map(data1.map(d => [d.label, d.caht]));
            map2 = new Map(data2.map(d => [d.label, d.caht]));
        }


        const aligned1 = allLabels.map(label => map1.get(label) ?? 0);
        const aligned2 = allLabels.map(label => map2.get(label) ?? 0);

        return {
            categories: allLabels,
            seriesData1: aligned1,
            seriesData2: aligned2
        };
    }



    start1: any;
    start2: any;
    end1: any;
    end2: any;
    setCAHT(caht: any) { this.CAHT = caht }
    setCATTC(cattc: any) { this.CATTC = cattc }
    setStart1(start1: any) { this.start1 = start1 }
    setStart2(start1: any) { this.start2 = start1 }
    setEnd1(start1: any) { this.end1 = start1 }
    setEnd2(start1: any) { this.end2 = start1 }
    setData1(data: any[]) {
        this.data1 = data;
    }
    setData2(data: any[]) {
        this.data2 = data;
    }

    async loadChart(isDarkMode: boolean): Promise<void> {
        const toolbarColor = isDarkMode ? 'white' : 'red';
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
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;
                const { categories, seriesData1, seriesData2 } = this.alignDatasets(this.data1, this.data2);

                // Define chart options
                const options = {
                    series: [
                        {
                            name: `Du ${this.start2} au ${this.end2}`,
                            type: 'area',
                            data: seriesData1
                        },
                        {
                            name: `Du ${this.start1} au ${this.end1}`,
                            type: 'line',
                            data: seriesData2
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "line",
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
                                        const originalWidth = this.chartInstance.w.globals.svgWidth || 800;  // Largeur du graphique
                                        const originalHeight = this.chartInstance.w.globals.svgHeight || 600; // Hauteur du graphique

                                       
                                        const pdf = new jsPDF({
                                            orientation: 'landscape',  
                                            unit: 'px',              
                                            format: 'a4',             
                                        });

                                      
                                        const pageWidth = 595;   // Largeur de la page A4 en paysage
                                        const pageHeight = 421;  // Hauteur de la page A4 en paysage

                                        const scaleX = pageWidth / originalWidth;  // Facteur d'échelle en largeur
                                        const scaleY = pageHeight / originalHeight; // Facteur d'échelle en hauteur

                                        
                                        const scaleFactor = Math.min(scaleX, scaleY);

                                        // Appliquer l'échelle pour redimensionner l'image
                                        const newWidth = originalWidth * scaleFactor;
                                        const newHeight = originalHeight * scaleFactor;

                                        // Centrer le graphique dans la page PDF
                                        const x = (pageWidth - newWidth) / 2;  // Position X pour centrer l'image
                                        const y = (pageHeight - newHeight) / 2; // Position Y pour centrer l'image

                                      
                                        pdf.addImage(imgURI, 'PNG', x, y, newWidth, newHeight);

                                       
                                        pdf.save('chart.pdf');
                                    });
                                }
                            }
                        ]





                    },
                    stroke: {
                        width: [0, 4]
                    },
                    title: {
                        text: "Traffic Sources",
                        align: "left",
                        offsetX: -9,
                        style: {
                            fontWeight: '500',
                            fontSize: '15px',
                            color: '#475569'
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        enabledOnSeries: [1],
                        style: {
                            fontSize: '12px'
                        }
                    },
                    labels: categories,
                    xaxis: {
                        type:  "category",
                        axisBorder: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        axisTicks: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            }
                        }
                    },
                    grid: {
                        show: false,
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0"
                    },
                    colors: [
                        "#0f79f3"
                    ],
                    legend: {
                        show: true,
                        offsetY: 10,
                        fontSize: '14px',
                        position: "bottom",
                        horizontalAlign: "center",
                        labels: {
                            colors: "#919aa3"
                        },
                        itemMargin: {
                            horizontal: 10,
                            vertical: 10
                        }
                    },
                    yaxis: [
                        {
                            title: {
                                text: this.CAHT === 'true' ? "CA(HT)" : "CA(TTC)",
                                style: {
                                    color: 'transparent'
                                }
                            },
                            labels: {
                                show: true,
                                style: {
                                    colors: "#919aa3",
                                    fontSize: "14px"
                                }
                            },
                            axisBorder: {
                                show: false
                            }
                        },
                        {
                            opposite: true,
                            title: {
                                text: "Social Media",
                                style: {
                                    color: 'transparent'
                                }
                            },
                            labels: {
                                show: true,
                                style: {
                                    colors: "#919aa3",
                                    fontSize: "14px"
                                }
                            },
                            axisBorder: {
                                show: false
                            }
                        }
                    ]
                };

                // Initialize and render the chart
                this.chartInstance = new ApexCharts(document.querySelector('#line_column_chart'), options);
                this.chartInstance.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}