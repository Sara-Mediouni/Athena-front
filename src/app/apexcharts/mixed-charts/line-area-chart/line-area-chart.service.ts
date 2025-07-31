import { Injectable, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class LineAreaChartService {

  private isBrowser: boolean;
  private chartInstance: any = null;
  data1: any[] = [];
  data2: any[] = [];
  CAHT:any;
  CATTC:any;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  alignDatasets(data1: any[], data2: any[]) {
    // 1. Crée un set de tous les labels (ex: 'mars 2023', 'mars 2024')
    const allLabels = Array.from(new Set([...data1.map(d => d.label), ...data2.map(d => d.label)]));

    // 2. Trie pour garder l'ordre
    allLabels.sort((a, b) => new Date('01 ' + a).getTime() - new Date('01 ' + b).getTime());

    // 3. Extraire seulement les mois pour l’axe X
    const monthOnlyLabels = Array.from(
      new Set(allLabels.map(label => label.split(' ')[0])) 
    );
let map1: Map<string, number>;
let map2: Map<string, number>;

if (this.CATTC === 'true') {
  map1 = new Map(data1.map(d => [d.label, d.cattc]));
  map2 = new Map(data2.map(d => [d.label, d.cattc]));
 
} else {
  map1 = new Map(data1.map(d => [d.label, d.caht]));
  map2 = new Map(data2.map(d => [d.label, d.caht]));
} 
console.log(map1);
  console.log(map2);
    // 5. Reconstituer les séries
    const aligned1 = monthOnlyLabels.map(month => {
      const fullLabel = allLabels.find(l => l.startsWith(month) && l.includes('2023'));
      return fullLabel ? (map1.get(fullLabel) ?? 0) : 0;
    });

    const aligned2 = monthOnlyLabels.map(month => {
      const fullLabel = allLabels.find(l => l.startsWith(month) && l.includes('2024'));
      return fullLabel ? (map2.get(fullLabel) ?? 0) : 0;
    });

    return {
      categories: monthOnlyLabels, // 'janvier', 'février', ...
      seriesData1: aligned1,       // Pour 2023
      seriesData2: aligned2        // Pour 2024
    };
  }

  start1: any;
  start2: any;
  end1: any;
  end2: any;
   setCAHT(caht: any) { this.CAHT= caht }
   setCATTC(cattc: any) { this.CATTC= cattc}
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
                  }
                ]


              }
            }
          },
          stroke: {
            curve: "smooth"

          },
          colors: [
            "#0f79f3", "#ffb264"
          ],
          fill: {
            type: "solid",
            opacity: [0.4, 1]
          },
          labels: categories,
          markers: {
            size: 0
          },
       yaxis: [
  {
    min: 0,
    title: {
      text: this.CAHT === 'true' ? "CA(HT)": "CA(TTC)",
      style: {
        color: "#475569",
        fontSize: "14px",
        fontWeight: 500
      }
    },
    labels: {
      style: {
        colors: "#919aa3",
        fontSize: "14px"
      },
      formatter: function (val:any) {
        return Math.round(val); // Supprime les décimales
      }
    },
    axisBorder: {
      show: false
    }
  }
]

          ,
          xaxis: {
            
        tickPlacement: 'on',
    
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
            shared: true,
            intersect: false,
            y: {
              formatter: function (val: any) {
                return val.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

              }
            }
          },
          legend: {
            horizontalAlign: "center",
            position: "bottom",
            fontSize: "14px",
            offsetY: 5,
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
        this.chartInstance = new ApexCharts(document.querySelector('#line_area_chart'), options);
        this.chartInstance.render();
      } catch (error) {
        console.error('Error loading ApexCharts:', error);
      }
    }
  }

}