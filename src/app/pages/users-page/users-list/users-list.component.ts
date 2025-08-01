import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { User } from '../../../Model/User';
import { Role } from '../../../Model/Role';
import { UserController } from '../../../Controller/UserController';
import { RoleController } from '../../../Controller/RoleController';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../Service/UserService';
import { EntService } from '../../../Service/entService';
import { Entreprise } from '../../../Model/Entreprise';
import { jwtDecode } from 'jwt-decode';
import { EntrepriseDTO } from '../../../Model/EntrepriseDTO';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-users-list',
    imports: [MatCardModule, MatMenuModule, MatButtonModule,MatIconModule, RouterLink, MatTableModule,MatProgressSpinner,
       MatPaginatorModule, MatCheckboxModule, MatTooltipModule,CommonModule,],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    displayedColumns: string[] = ['id', 'name', 'email', 'roles','entreprises', 'action'];
    dataSource = new MatTableDataSource<User>([]);
    selection = new SelectionModel<User>(true, []);
    errorMessage: string = '';
    entreprisesList: EntrepriseDTO[] = [];
    users: User[] = [];
    currentUser: any;
  currentUserId: number | null = null;
    Role: Role = Role.ADMIN;
    selectedRole: string | null = null;
     currentUserRole: string = '';
     token:any;
    user: User = new User(0, '', '', '', Role.USER,[]);
    selectedUser: User = new User(0, '', '',  '', Role.USER,[]);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    isLoading: boolean = false;
    constructor(

      private entService: EntService,
      public themeService: CustomizerSettingsService,
      private userController: UserController,
      private userService:UserService,
      
    ) {}
  
ngOnInit(): void {
  this.loadEntreprises(); 
  this.token = localStorage.getItem('accessToken'); 

  if (this.token) {
     this.userService.getUserConnected(this.token).subscribe(
      (user) => {
        this.currentUser = user;
        this.currentUserRole = user.role; 
        console.log(this.currentUser);

         if (this.currentUserRole === "USER") {
          try {
            this.dataSource.data = [this.currentUser];
            console.log(this.dataSource.data);
          } catch (error) {
            console.error("Erreur lors du traitement des données utilisateur:", error);
          }
        } else {
          this.getAllUsers();  
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      }
    );
  } else {
    console.error("Token non trouvé dans localStorage");
  }
}

    getEntreprisesLabelList(user: User): string {
  if (!user.entreprises || user.entreprises.length === 0) {
    return 'Aucune entreprise';
  }

  return user.entreprises
    .map(e => this.getEntreprisesLabel(e.id ?? 0))
    .join(', ');
}

   loadEntreprises(): void {
    
    this.entService.getAll().subscribe({
      next: (data) => {
        this.entreprisesList  = data; 
        console.log(this.entreprisesList)
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises', error);
        this.errorMessage = 'Erreur lors du chargement des entreprises';
      }})}
    
  getEntreprisesLabel(id?: number): string {
  if (!id) return 'Inconnue';
  const ent = this.entreprisesList.find(e => e.id === id);
  return ent ? ent.name : 'Inconnue';
}


    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
    }
  
    getAllUsers(): void {
      this.isLoading = true;
      this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.dataSource.data  = data; 
        this.isLoading = false;
        console.log(data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        this.isLoading = false;
      }
    });
    }

     onDelete(id: number) {
  if (confirm(`Supprimer l'utilisateur "${id}" ?`)) {
    this.userController.deleteUser(id).subscribe({
      next: () => {
        this.getAllUsers();  
      },
      error: err => {
        console.error('Erreur de suppression :', err);
        alert('Erreur lors de la suppression');
      }
    });
  }
  
}
  
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}

