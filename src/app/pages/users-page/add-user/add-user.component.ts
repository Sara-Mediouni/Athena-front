import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule , Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RoleController } from '../../../Controller/RoleController';
import { UserController } from '../../../Controller/UserController';
import { Role } from '../../../Model/Role';
import { CommonModule } from '@angular/common';
import { User } from '../../../Model/User';
import { Entreprise } from '../../../Model/Entreprise';
import { EntService } from '../../../Service/entService';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink,
         FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
          MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
           FileUploadModule, MatRadioModule, MatCheckboxModule, CommonModule],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  role: Role = Role.ADMIN;
  users: User[] = [];
  entreprises: Entreprise[] = [];
  selectedEntreprises: number[] = [];
    errorMessage: string = '';
  public multiple: boolean = false;
  form!: FormGroup;

  constructor(
    public themeService: CustomizerSettingsService,
    private fb: FormBuilder,
    private userController: UserController,
    private roleController: RoleController,
    private router: Router, 
    private entService: EntService
    
  ) {}

ngOnInit(): void {
  this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required],
    entreprises: [[], Validators.required] // ← ici, initialise comme tableau vide
  });

  this.loadEntreprises();
}

 loadEntreprises(): void {
    this.entService.getAll().subscribe({
      next: (data) => {
        this.entreprises = data; 
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises', error);
        this.errorMessage = 'Erreur lors du chargement des entreprises';
      }
    });
  }
 roles = Object.values(Role);
  onSubmit(): void {
  if (this.userForm.valid) {
    const { name, email, password, role } = this.userForm.value;
    const entreprisesIds: number[] = this.userForm.get('entreprises')?.value || [];
    const entreprisesObjects = entreprisesIds.map(id => ({ id }));

    const userToSend = {
      name,
      email,
      password,
      role,
      entreprises: entreprisesObjects
    };

    console.log('User data to send:', userToSend);

    this.userController.addUser(userToSend).subscribe({
      next: (createdUser) => {
        console.log('User registered successfully:', createdUser);
        
        this.router.navigate(['/users/users-list']);
      },
      
  error: (err) => {
    console.error('Erreur reçue du backend :', err);
    alert(err?.error?.message || err?.error?.error || 'Erreur inconnue');
  }
     
    });
  } else {
    console.log('Form is invalid.');
  }
}


  onRoleChange(event: any, role: string) {
    const currentRoles = this.userForm.value.roles as string[];
    if (event.checked) {
      this.userForm.patchValue({ roles: [...currentRoles, role] });
    } else {
      this.userForm.patchValue({ roles: currentRoles.filter(r => r !== role) });
    }
  }
}