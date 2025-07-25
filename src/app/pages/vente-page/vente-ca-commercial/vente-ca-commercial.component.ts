import { Component, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Entreprise } from '../../../Model/Entreprise';
import { EntService } from '../../../Service/entService';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EntrepriseDTO } from '../../../Model/EntrepriseDTO';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../Service/UserService';
import { AuthService } from '../../../Service/AuthService';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VenteService } from '../../../Service/VenteService';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BasicColumnChartComponent } from '../../../apexcharts/column-charts/basic-column-chart/basic-column-chart.component';
import { PieDonutChartComponent } from '../../../apexcharts/pie-charts/pie-donut-chart/pie-donut-chart.component';
@Component({
  selector: 'app-vente-ca-commercial',
  imports: [MatCardModule, MatMenuModule, MatButtonModule,MatIconModule,MatFormField,MatLabel,
    
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,CommonModule,
    MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,
     MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
      MatNativeDateModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
      MatProgressSpinner,
      NgxMaterialTimepickerModule,PieDonutChartComponent,
     RouterLink,MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatTooltipModule,CommonModule,],  
  templateUrl: './vente-ca-commercial.component.html',
  styleUrl: './vente-ca-commercial.component.scss'
})
export class VenteCaCommercialComponent {


  displayedColumns: string[] = ['nom_co', 'caht', 'cattc'];
  entreprises: EntrepriseDTO[] = [];
  errorMessage: string = '';
  isLoading = true;
   user: string | null = null;
    role: string | null = null;
    form: FormGroup;
  token:any;
  currentUser:any;
  CAGlobal: any;
    data: []=[];
  dataSource = new MatTableDataSource<EntrepriseDTO>([]);
  selection = new SelectionModel<Entreprise>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(
    public themeService: CustomizerSettingsService,
    
    private venteService: VenteService,
    private fb: FormBuilder,
    
    ) {
         const now = new Date();
  const startOfYear = new Date(2021, 0, 1); // 1er janvier de l'année en cours
  const endOfYear = new Date(2022, 0, 1);
 

  this.form = this.fb.group({
    dateFacture: [true],
    dateBL: [false],
    inclureBLs: [false],
    dateDebut: [startOfYear],
    dateFin: [endOfYear],
    groupBy: ['commercial'] // Vous pouvez ajuster cette valeur selon vos besoins

  });
    }
   ngOnInit(): void {
     this.form.get('dateFacture')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('dateBL')?.setValue(false, { emitEvent: false });
    }
  });

  this.form.get('dateBL')?.valueChanges.subscribe(value => {
    if (value) {
      this.form.get('dateFacture')?.setValue(false, { emitEvent: false });
    }
  });
  this.loadCA();
}


    
    loadCA(): void {
  const formValues = this.form.value;
  const dateDebut = formValues.dateDebut.toISOString().split('T')[0];
  const dateFin = formValues.dateFin.toISOString().split('T')[0];
  const inclureBLs = formValues.inclureBLs ? 'true' : 'false';
  const mode = formValues.dateFacture ? 'dateFacture' : (formValues.dateBL ? 'dateBL' : 'dateFacture');
  const groupBy = "commercial";

  this.isLoading = true; 

  this.venteService.getCAPeriod(dateDebut, dateFin, mode, inclureBLs, groupBy).subscribe({
    next: (data) => {
      this.CAGlobal = data;
      this.isLoading = false;
      this.dataSource.data = this.CAGlobal;
      console.log('CA Global:', this.CAGlobal);
    },
    error: (error) => {
      console.error('Erreur lors du chargement du CA Global', error);
      this.errorMessage = 'Erreur lors du chargement du CA Global';
      this.isLoading = false; 
    }
  });
}
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
    }

     onSubmit(): void {
    if (this.form.valid) {
    this.loadCA(); 
  }
  }



}

