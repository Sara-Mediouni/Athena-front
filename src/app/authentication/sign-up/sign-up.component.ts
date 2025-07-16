import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../Service/AuthService';
import { TokenService } from '../../Service/TokenService';
import { Role } from '../../Model/Role';

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, MatFormFieldModule,CommonModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf,MatSelectModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    email : string = '' ;
    role: Role = Role.USER; 
     error: string | null = null;
    name: string = '' ;
    password: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private authService :AuthService, private tokenService:TokenService
        
    ) {
        this.authForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            role: ['', Validators.required],
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    roles = Object.values(Role);
    ngOnInit() {
  if (this.error !== null) {
    setTimeout(() => {
      this.error = null;  
    }, 3000);
  }
}


    onSubmit() {
    const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;
    const name = this.authForm.get('name')?.value;
    const role = this.authForm.get('role')?.value;



    console.log('Email:', email);
    console.log('Password:', password);
    console.log('role:', role);
    console.log('name:', name);

        this.authService.signup(email,name,password,role).subscribe({
          next: (response) => {
            this.authService.setUsernameOrEmail(this.email);
            console.log('signup mail:', this.email);
            this.router.navigate(['/commerce']);
            console.log('signup successful:', response);
          },
          error: (error) => {
          this.error=error.error.message;
          console.error('signup error:', error.error.message);
          console.error('signup error:', error);
          },
        });
      
    }

}