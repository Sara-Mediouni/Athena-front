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
import { filter, map, Observable, switchMap, take, throwError } from 'rxjs';
import { User } from '../../Model/User';
import { EntrepriseDTO } from '../../Model/EntrepriseDTO';
import { EntService } from '../../Service/entService';


@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {



  usernameOrEmail: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  user: string | null = null;
  token: any;
  entreprises: EntrepriseDTO[] = [];







  constructor(
    private fb: FormBuilder,
    private router: Router,
    public themeService: CustomizerSettingsService,
    private entService: EntService,
    
    private authService: AuthService, private dialog: MatDialog
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
        this.error = null;
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

      loadEntreprises(): void {
    
    this.entService.getAll().subscribe({
      next: (data) => {
        this.entreprises  = data; 
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises', error);
        this.errorMessage = 'Erreur lors du chargement des entreprises';
      }
    });
  }


 login() {
  const email = this.authForm.get('email')?.value;
  const password = this.authForm.get('password')?.value;

  this.authService.login(email, password).subscribe({
    next: () => {
      this.authService.setUsernameOrEmail(email);  // ou this.usernameOrEmail

      this.loadUser().subscribe({
        next: ({ user, entreprises }) => {
          this.user = user.name;
          console.log('Données entreprises avant ouverture dialog :', entreprises);

         const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: {
              name: user.name,
              entreprises: entreprises
            },
            width: '700px',
            maxWidth: '90vw',
            
            
          });
          dialogRef.afterClosed().subscribe((selectedEntrepriseId) => {
  if (selectedEntrepriseId) {
    // Tu peux naviguer ici
    this.router.navigate(['/vente/global']); // exemple
  }})
        },
        error: (error) => {
          console.error('Erreur lors du chargement du user ou des entreprises :', error);
        }
      });
    },
    error: (error) => {
      this.error = error.error.message;
      console.error('Login error:', error);
    }
  });
}

loadUser(): Observable<{ user: User, entreprises: EntrepriseDTO[] }> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return throwError(() => new Error('Token non trouvé'));
  }

  this.authService.loadUserFromToken(token);

  return this.authService.currentUser$.pipe(
    filter(user => !!user),
    take(1),
    switchMap(user => {
      if (user.role === 'SUPER_ADMIN') {
        return this.entService.getAll().pipe(
          map(entreprises => ({ user, entreprises }))
        );
      } else {
        return this.entService.getMyEntreprise().pipe(
          map(entreprises => ({ user, entreprises }))
        );
      }
    })
  );
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