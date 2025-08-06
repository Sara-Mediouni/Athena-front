import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../Service/AuthService';
import { DialogOverviewExampleDialog } from '../../ui-elements/dialog/basic-dialog/basic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, switchMap, take, throwError } from 'rxjs';
import { User } from '../../Model/User';
import { EntrepriseDTO } from '../../Model/EntrepriseDTO';
import { EntService } from '../../Service/entService';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  imports: [
    
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ]
})
export class SignInComponent implements OnInit {
  authForm: FormGroup;
  hide = true;
  error: string | null = null;
  user: string | null = null;
  entreprises: EntrepriseDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public themeService: CustomizerSettingsService,
    private entService: EntService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation terminé vers :', event.urlAfterRedirects);
      }
    });

    if (this.error !== null) {
      setTimeout(() => {
        this.error = null;
      }, 2000);
    }
  }
login(): void {
  const email = this.authForm.get('email')?.value;
  const password = this.authForm.get('password')?.value;

  if (!email || !password) {
    this.error = 'Veuillez remplir tous les champs';
    return;
  }

  this.authService.login(email, password).subscribe({
    next: () => {
    
      this.loadUser().subscribe({
        next: ({ user, entreprises }) => {
          this.user = user.name;
          console.log('Entreprises récupérées :', entreprises);

          const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: {
              name: user.name,
              entreprises: entreprises
            },
            width: '700px',
            maxWidth: '90vw'
          });

          dialogRef.afterClosed().subscribe(selectedEntrepriseId => {
            if (selectedEntrepriseId) {
              this.router.navigate(['/vente/global']);
            }
          });
        },
        error: err => {
          console.error('Erreur lors de la récupération de l\'utilisateur ou des entreprises :', err);
          this.error = 'Erreur lors du chargement';
        }
      });
    },
    error: err => {
      this.error = err.error?.message || 'Erreur de connexion';
      console.error('Erreur login :', err);
    }
  });
}

  loadUser(): Observable<{ user: User; entreprises: EntrepriseDTO[] }> {
   

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

refreshToken(): void {
  this.authService.refreshToken().subscribe({
    next: () => {
      console.log('Token rafraîchi avec succès');
      // Pas besoin de gérer ou stocker les tokens ici
    },
    error: err => {
      console.error('Erreur lors du rafraîchissement du token :', err);
      // Par exemple, forcer logout si le refresh échoue
      this.authService.logout();
    }
  });
}

}
