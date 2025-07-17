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
import { StatsDialogComponent } from '../stats-dialog/stats-dialog.component';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-entreprises-list',

imports: [MatCardModule, MatMenuModule, MatButtonModule,MatIconModule, RouterLink,MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatTooltipModule,CommonModule,],  
templateUrl: './entreprises-list.component.html',
  styleUrl: './entreprises-list.component.scss'
})
export class EntreprisesListComponent {
  displayedColumns: string[] = ['id', 'matricule', 'name', 'address','lien', 'actions'];
  entreprises: EntrepriseDTO[] = [];
  errorMessage: string = '';
  isLoading = true;
   user: string | null = null;
    role: string | null = null;
  token:any;
  currentUser:any;
  dataSource = new MatTableDataSource<EntrepriseDTO>([]);
  selection = new SelectionModel<Entreprise>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(
    public themeService: CustomizerSettingsService,
    private dialog: MatDialog,
    private entService: EntService,
    private authService: AuthService,
    
    ) {}
   ngOnInit(): void {
  if (typeof window !== 'undefined') {
    this.token = localStorage.getItem('accessToken');
    this.authService.loadUserFromToken(this.token);

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.role = user.role;
        console.log('Utilisateur chargé :', user);

        if (this.role === 'SUPER_ADMIN') {
          this.loadEntreprises(); 
          this.isLoading = false;
        } else {
          this.entService.getMyEntreprise().subscribe({
            next: (entreprises: EntrepriseDTO[] | null) => {
              if (entreprises && entreprises.length > 0) {
                this.entreprises = entreprises;
                this.dataSource.data = this.entreprises;
                this.isLoading = false; // Fin du chargement
                console.log('Entreprises chargées :', entreprises);
              } else {
                console.error('Aucune entreprise trouvée');
              }
            },
            error: (err) => {
              console.error('Erreur lors du chargement des entreprises', err);
            }
          });
        }

      } else {
        console.log('Utilisateur non trouvé');
      }
    });
  }
}


    
  
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
    }
   openStatsDialog(ent: any, type: string): void {
    this.dialog.open(StatsDialogComponent, {
      width: '500px',          // largeur de la modale
      data: {                  // données passées à la modale
        entreprise: ent,
        type: type,
      }
    });
  }
  onDelete(id: number) {
  if (confirm(`Supprimer l'entreprise "${id}" ?`)) {
    this.entService.deleteEntreprise(id).subscribe({
      next: () => {
        this.loadEntreprises(); // recharge la liste après suppression
      },
      error: err => {
        console.error('Erreur de suppression :', err);
        alert('Erreur lors de la suppression');
      }
    });
  }
  
}

   loadEntreprises(): void {
    
    this.entService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data  = data; 
        console.log(this.dataSource.data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises', error);
        this.errorMessage = 'Erreur lors du chargement des entreprises';
      }
    });
  }
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

