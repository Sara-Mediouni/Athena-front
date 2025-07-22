import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule , Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RoleController } from '../../../Controller/RoleController';
import { UserController } from '../../../Controller/UserController';
import { Role } from '../../../Model/Role';
import { CommonModule } from '@angular/common';
import { User } from '../../../Model/User';
import { NewUsersService } from '../../../dashboard/crm/stats/new-users/new-users.service';
import { UserService } from '../../../Service/UserService';
import { Entreprise } from '../../../Model/Entreprise';
import { EntService } from '../../../Service/entService';

@Component({
  selector: 'app-update-user',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink,
         FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
          MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
           FileUploadModule, MatRadioModule, MatCheckboxModule, CommonModule,],
  
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit 
 {
userForm!: FormGroup;
  userId!: number;
 entreprises: Entreprise[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private entrepriseService: EntService,
    private router: Router
  ) {}
    ngOnInit(): void {
      this.entrepriseService.getAll().subscribe((allEntreprises) => {
    this.entreprises = allEntreprises; // ← pour le <mat-select>
  });
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loaduser();
  }
  loaduser() {
    this.userService.getUserById(this.userId).subscribe((user) => {
      console.log(user);
    const entrepriseIds = user.entreprises.map((e: any) => e.id);

    this.userForm.patchValue({
      email: user.email,
      name: user.name,
      role: user.role,
      password:user.password,
      entreprises: entrepriseIds  // ← on ne met que les IDs ici
    });
    
    });
  }
  roles = Object.values(Role);
   initForm() {
    this.userForm = this.fb.group({
      email: [''],
      name: [''],
      role: [''],
      password: [''],
      entreprises: [''],
    });
  }
    onRoleChange(event: any, role: string) {
    const currentRoles = this.userForm.value.roles as string[];
    if (event.checked) {
      this.userForm.patchValue({ roles: [...currentRoles, role] });
    } else {
      this.userForm.patchValue({ roles: currentRoles.filter(r => r !== role) });
    }
  }
   onSubmit() {
  if (this.userForm.valid) {
    const formValue = { ...this.userForm.value };

    
    formValue.entreprises = formValue.entreprises?.map((id: number) => ({ id }));

    this.userService.updateUser(this.userId, formValue).subscribe(() => {
      this.router.navigate(['/users/users-list']);
    });
  }
}

}
