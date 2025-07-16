import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RoleController } from '../../../Controller/RoleController';
import { UserController } from '../../../Controller/UserController';
import { User } from '../../../Model/User';
import { Role } from '../../../Model/Role';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-team-members',
    imports: [MatCardModule, MatMenuModule, MatButtonModule,  NgFor,CommonModule],
    templateUrl: './team-members.component.html',
    styleUrl: './team-members.component.scss'
})

export class TeamMembersComponent {


    displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
    dataSource = new MatTableDataSource<User>([]);
    selection = new SelectionModel<User>(true, []);


    users: User[] = [];
        role: Role= Role.USER;

   
    constructor(
        public themeService: CustomizerSettingsService ,
         private userController: UserController,
              private roleController: RoleController
    ) {}


    ngOnInit(): void {
        this.getAllUsers();
      }




    getAllUsers(): void {
          this.userController.getUser().subscribe(
            (data) => {
              console.log("Données reçues:", data);
              this.users = data.map(userData => new User(
                userData.id ?? 0,
                userData.name,
                userData.email,
                userData.password,
                userData.role,
                userData.entreprises ?? []
              ));
              this.dataSource.data = this.users;
            },
            (error) => {
              console.error('Erreur de récupération des utilisateurs', error);
            }
          );
        }
      
       

}