import { Component } from '@angular/core';
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
import { EntrepriseController } from '../../../Controller/EntrepriseController';
import { EntService } from '../../../Service/entService';
@Component({
  selector: 'app-update-entreprise',
      imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink,
         FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
          MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
           FileUploadModule, MatRadioModule, MatCheckboxModule, CommonModule,],
  templateUrl: './update-entreprise.component.html',
  styleUrl: './update-entreprise.component.scss'
})
export class UpdateEntrepriseComponent {
entrepriseForm!: FormGroup;
  entrepriseId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private entrepriseService: EntService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.entrepriseId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadEntreprise();
  }

  initForm() {
    this.entrepriseForm = this.fb.group({
      matricule: [''],
      name: [''],
      link: [''],
      address: [''],
    });
  }

   loadEntreprise() {
    this.entrepriseService.getEntrepriseById(this.entrepriseId).subscribe((entreprise) => {
      console.log(entreprise);
      this.entrepriseForm.patchValue({
        matricule: entreprise.matricule,
        name: entreprise.name,
        address: entreprise.address,
        link: entreprise.lien
      });
      
    });
  }

  onSubmit() {
    if (this.entrepriseForm.valid) {
      this.entrepriseService.updateEntreprise(this.entrepriseId, this.entrepriseForm.value).subscribe(() => {
        this.router.navigate(['/entreprises']);
      });
    }
  }
}

