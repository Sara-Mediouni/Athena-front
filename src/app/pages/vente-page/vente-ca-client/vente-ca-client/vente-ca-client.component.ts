
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Subscription } from 'rxjs';
import { PieDonutChartComponent } from '../../../../apexcharts/pie-charts/pie-donut-chart/pie-donut-chart.component';
import { VenteFilterComponent } from '../../../../common/filters/vente-filter/vente-filter.component';
import { EntrepriseSelectionService } from '../../../../Service/EntrepriseSelectionService';
import { EntrepriseDTO } from '../../../../Model/EntrepriseDTO';
import { Entreprise } from '../../../../Model/Entreprise';
import { VenteService } from '../../../../Service/VenteService';
import { MatSort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-vente-ca-client',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, MatIconModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule, CommonModule,
    MatButtonModule, MatDatepickerModule, MatCheckboxModule,
    MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule
    , FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
    MatProgressSpinner,MatSortModule,
    NgxMaterialTimepickerModule, PieDonutChartComponent,
    RouterLink, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
     MatTooltipModule, CommonModule, VenteFilterComponent],

  templateUrl: './vente-ca-client.component.html',
  styleUrl: './vente-ca-client.component.scss'
})
export class VenteCaClientComponent {
  displayedColumns: string[] = ['nom_client', 'caht', 'cattc'];
  entreprises: EntrepriseDTO[] = [];
  errorMessage: string = '';
  isLoading = true;
  user: string | null = null;
  role: string | null = null;


  currentUser: any;
  CAGlobal: any;
  data: [] = [];
  dataSource = new MatTableDataSource<EntrepriseDTO>([]);
  selection = new SelectionModel<Entreprise>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private entrepriseSub!: Subscription;

  private lastFiltre: any;
  constructor(

    private venteService: VenteService,
    private fb: FormBuilder,
    private entrepriseSelectionService: EntrepriseSelectionService
  ) {

  }



  ngOnInit(): void {

    this.entrepriseSub = this.entrepriseSelectionService.selectedEntreprise$.subscribe((entreprise: EntrepriseDTO | null) => {
      if (entreprise && this.lastFiltre) {
        this.loadCA(this.lastFiltre);
      }
    });
  }
  applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  loadCA(filtre: any): void {
    this.lastFiltre = filtre;
    const dateDebut = new Date(filtre.dateDebut).toISOString().split('T')[0];
    const dateFin = new Date(filtre.dateFin).toISOString().split('T')[0];
    const inclureBLs = filtre.inclureBLs ? 'true' : 'false';
    const mode = filtre.dateFacture ? 'dateFacture' : (filtre.dateBL ? 'dateBL' : 'dateFacture');
    const groupBy = "client";

    this.isLoading = true;

    this.venteService.getCAPeriod(dateDebut, dateFin, mode, inclureBLs, groupBy).subscribe({
      next: (data:any) => {
        this.CAGlobal = data;
        this.isLoading = false;
        this.dataSource.data = this.CAGlobal;
         this.dataSource.sort = this.sort;
      },
      error: (error:any) => {
        console.error('Erreur lors du chargement du CA Client', error);
        this.errorMessage = 'Erreur lors du chargement du CA Client';
        this.isLoading = false;
      }
    });
  }

 
 ngAfterViewInit(): void {
  setTimeout(() => {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.active = 'nom_client';
this.sort.direction = 'asc'; 
this.sort.sortChange.emit({ active: this.sort.active, direction: this.sort.direction });

    }
  });
}
  ngOnDestroy(): void {
    this.entrepriseSub?.unsubscribe();
  }




}


