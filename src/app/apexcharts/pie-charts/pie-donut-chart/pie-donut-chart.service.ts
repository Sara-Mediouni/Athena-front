import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import jsPDF from 'jspdf';
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
    private generateUniqueColors(count: number): string[] {
        const colors = new Set<string>();

        while (colors.size < count) {
            // Génère une couleur hex aléatoire
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            colors.add(color);
        }

        return Array.from(colors);
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
                const total = seriesData.reduce((acc, val) => acc + val, 0);
                const colors = this.generateUniqueColors(this.data.length);

             const toolbarColor = isDarkMode ? 'white' : 'red';
                const options = {
                    series: seriesData,
                    chart: {
                        type: "donut",
                         zoom: {
      enabled: true,       // active le zoom
      type: 'x',           // zoom horizontal (peut être 'x', 'y' ou 'xy')
      autoScaleYaxis: true // ajuste l'axe Y automatiquement lors du zoom
    },
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

  // Obtenir l'URI de l'image du graphique
  this.chartInstance.dataURI().then(({ imgURI }: { imgURI: string }) => {
    const originalWidth = this.chartInstance.w.globals.svgWidth || 800;  // Largeur du graphique
    const originalHeight = this.chartInstance.w.globals.svgHeight || 600; // Hauteur du graphique

    // Créer un document PDF avec un format A4
    const pdf = new jsPDF({
      orientation: 'landscape',  // Format paysage (landscape)
      unit: 'px',                // Unité en pixels
      format: 'a4',              // Format A4 standard
    });

    // Récupérer les dimensions de la page A4 en paysage
    const pageWidth = 595;   // Largeur de la page A4 en paysage
    const pageHeight = 421;  // Hauteur de la page A4 en paysage

    // Calculer l'échelle nécessaire pour que le graphique tienne sur la page
    const scaleX = pageWidth / originalWidth;  // Facteur d'échelle en largeur
    const scaleY = pageHeight / originalHeight; // Facteur d'échelle en hauteur

    // Prendre le plus petit facteur d'échelle pour garder les proportions
    const scaleFactor = Math.min(scaleX, scaleY);

    // Appliquer l'échelle pour redimensionner l'image
    const newWidth = originalWidth * scaleFactor;
    const newHeight = originalHeight * scaleFactor;

    // Centrer le graphique dans la page PDF
    const x = (pageWidth - newWidth) / 2;  // Position X pour centrer l'image
    const y = (pageHeight - newHeight) / 2; // Position Y pour centrer l'image

    // Ajouter l'image du graphique dans le PDF
    pdf.addImage(imgURI, 'PNG', x, y, newWidth, newHeight);

    // Sauvegarder le PDF
    pdf.save('chart.pdf');
  });
}
,
      zoom: true,
      zoomin: true,
      zoomout: true,
      pan: true,
      reset: true
                                    }
                                ]


                            }
                        }
                    },
                    labels: categories,
                    responsive: [
                        {
                            breakpoint: 450,
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
                        // "#0f79f3", "#796df6", "#e74c3c", "#00cae3", "#ffb264",
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: (val: number) => {
                            const percentage = (val).toFixed(1); // Apex passe déjà le %
                            return `${percentage}%`;
                        },
                        style: {
                            fontSize: '14px',
                        },

                        dropShadow: {
                            enabled: false
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (val: number) => {
                                const percentage = ((val / total) * 100).toFixed(1);
                                return `${percentage}%`;
                            }
                        }
                    }
                }

                // Initialize and render the chart
                this.chartInstance = new ApexCharts(document.querySelector('#pie_donut_chart'), options);
                this.chartInstance.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}