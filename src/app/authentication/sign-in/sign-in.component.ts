import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationEnd, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../Service/AuthService';
import { TokenService } from '../../Service/TokenService';
import { DialogOverviewExampleDialog } from '../../ui-elements/dialog/basic-dialog/basic-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
    standalone: true,
    selector: 'app-sign-in',
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {



    usernameOrEmail : string = '' ;
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
   error: string | null = null;








    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private authService :AuthService, private dialog: MatDialog
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }



    ngOnInit() {

        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            console.log('Navigation End:', event); // Affiche les événements de navigation
          }
        });
        if (this.error !== null) {
    setTimeout(() => {
      this.error =null;  
    }, 3000);
  }
      }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.router.navigate(['/']);
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }




    login() {

        const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;



    console.log('Email:', email);
    console.log('Password:', password);



        this.authService.login(email,password).subscribe({
          next: (response) => {
            this.authService.setUsernameOrEmail(this.usernameOrEmail);
            console.log('Login mail:', this.usernameOrEmail);
              this.dialog.open(DialogOverviewExampleDialog, {
        data: {
          name: "user",
          animal: 'lion' // par exemple
        },
         width: '500px', 
         maxWidth: '90vw'
      });
      
           
          },
          error: (error) => {
      
          
      
            this.error=error.error.message;
            console.error('Login error:', error);
          },
        });
      }





      refreshToken() {
        this.authService.refreshToken().subscribe({
          next: (response) => {
            console.log('Token refreshed:', response);
      
           
      
      
          },
          error: (error) => {
      
           
      
            console.error('Refresh error:', error);
          },
        });
      }




}