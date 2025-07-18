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

import { CommonModule } from '@angular/common';

import { EntService } from '../../../Service/entService';

@Component({
    selector: 'app-add-entreprise',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink,
         FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
          MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule,
           FileUploadModule, MatRadioModule, MatCheckboxModule, CommonModule,],
    templateUrl: './add-entreprise-page.component.html',
    styleUrl: './add-entreprise-page.component.scss'
})
export class AddEntreprisePageComponent implements OnInit {
  entForm!: FormGroup;
  public multiple: boolean = false;

  constructor(
    public themeService: CustomizerSettingsService,
    private fb: FormBuilder,
    private entrepriseService: EntService,
    private router: Router, 
  ) {}

  ngOnInit(): void {
    this.entForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      link: ['', [Validators.required]],
      matricule: ['', Validators.required],
    });

    
  }

 
  onSubmit(): void {
    const name = this.entForm.get('name')?.value;
    const matricule = this.entForm.get('matricule')?.value;
    const link = this.entForm.get('link')?.value;
    const address = this.entForm.get('address')?.value;

    console.log('name:', name);
    console.log('address:', address);
    console.log('matricule:', matricule);
    console.log('link:', link);

    // Vérifier si le formulaire est valide
    if (this.entForm.valid) {
      const entrepriseToSend = {
        name: name,
        matricule: matricule,
        address: address,
        lien: link
      };

      console.log('Entreprise data to send:', entrepriseToSend);

      this.entrepriseService.add(entrepriseToSend).subscribe({
        next: (createdEntreprise) => {
          console.log('Ent registered successfully:', createdEntreprise);
          this.router.navigate(['/entreprises/']); // Redirection après succès
        },
        error: (err) => {
          console.error('Error registering entreprise:', err);
        }
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }


}