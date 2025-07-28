import { CommonModule, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../Service/AuthService';
import { CookieService } from 'ngx-cookie-service';

import { EntService } from '../../Service/entService';
import { MatTableDataSource } from '@angular/material/table';
import { EntrepriseDTO } from '../../Model/EntrepriseDTO';
import { MatIcon } from '@angular/material/icon';
import { EntrepriseSelectionService } from '../../Service/EntrepriseSelectionService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, CommonModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedEntreprise: EntrepriseDTO | null = null;
  user: string | null = null;
  dataSource = new MatTableDataSource<EntrepriseDTO>([]);
  role: string | null = null;
  entreprises: EntrepriseDTO[] = [];
  isSidebarToggled = false;
  token: any;
  errorMessage: string = '';
  isToggled = false;
  isLoading = true;
  
  private cookieService = inject(CookieService);
  private subscriptions: Subscription = new Subscription();

  constructor(
    private toggleService: ToggleService,
    public themeService: CustomizerSettingsService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private entrepriseSelectionService: EntrepriseSelectionService,
    private entService: EntService,
    private router: Router
  ) {
    this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
      this.isSidebarToggled = isSidebarToggled;
    });
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    this.loadUser();

    
    this.subscriptions.add(
      this.entrepriseSelectionService.selectedEntreprise$.subscribe(ent => {
        this.selectedEntreprise = ent;
        this.cdRef.detectChanges(); // forcer rafraîchissement UI si besoin
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectEntreprise(ent: EntrepriseDTO) {
    this.selectedEntreprise = ent;
    this.cookieService.set('selectedEntrepriseId', ent.id.toString(), 7);
    this.entrepriseSelectionService.setSelectedEntreprise(ent); // Notifier service global
    console.log('Entreprise sélectionnée :', ent);
  }

  loadSelectedEntrepriseFromCookie() {
    const savedId = this.cookieService.get('selectedEntrepriseId');
    if (savedId && this.entreprises.length > 0) {
      const found = this.entreprises.find(e => e.id.toString() === savedId);
      if (found) {
        this.selectedEntreprise = found;
        this.entrepriseSelectionService.setSelectedEntreprise(found);
      } else {
        console.log('Aucune entreprise trouvée avec cet ID dans la liste');
      }
    }
  }

  toggle() {
    this.toggleService.toggle();
  }

  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = scrollPosition >= 50;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  loadEntreprises(): void {
    this.entService.getAll().subscribe({
      next: (data) => {
        this.entreprises = data;
        this.loadSelectedEntrepriseFromCookie();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises', error);
        this.errorMessage = 'Erreur lors du chargement des entreprises';
      }
    });
  }

  loadUser(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('accessToken');

      if (this.token) {
        this.isLoading = true;

        this.authService.loadUserFromToken(this.token);

        const sub = this.authService.currentUser$.subscribe(user => {
          if (user) {
            this.user = user.name;
            this.role = user.role;

            if (this.role === 'SUPER_ADMIN') {
              this.entService.getAll().subscribe({
                next: (data) => {
                  this.entreprises = data;
                  this.loadSelectedEntrepriseFromCookie();
                  this.isLoading = false;
                },
                error: (error) => {
                  console.error('Erreur lors du chargement des entreprises', error);
                  this.errorMessage = 'Erreur lors du chargement des entreprises';
                  this.isLoading = false;
                }
              });
            } else {
              this.entService.getMyEntreprise().subscribe({
                next: (entreprises: EntrepriseDTO[] | null) => {
                  if (entreprises && entreprises.length > 0) {
                    this.entreprises = entreprises;
                    this.loadSelectedEntrepriseFromCookie();
                    this.isLoading = false;
                    console.log('Entreprises chargées :', entreprises);
                  } else {
                    console.error('Aucune entreprise trouvée');
                    this.isLoading = false;
                  }
                },
                error: (err) => {
                  console.error('Erreur lors du chargement des entreprises', err);
                  this.isLoading = false;
                }
              });
            }
          } else {
            this.user = null;
            this.role = null;
            this.isLoading = false;
          }
        });

        this.subscriptions.add(sub);

      } else {
        console.error('Aucun token trouvé dans localStorage');
        this.user = null;
        this.role = null;
        this.isLoading = false;
      }
    } else {
      console.error('localStorage n\'est pas disponible');
      this.user = null;
      this.role = null;
      this.isLoading = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication']);
  }
}
