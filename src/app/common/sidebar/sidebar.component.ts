import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ToggleService } from './toggle.service';
import { CommonModule, NgClass } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { UserService } from '../../Service/UserService';
import { AuthService } from '../../Service/AuthService';


@Component({
    selector: 'app-sidebar',
    imports: [NgScrollbarModule, MatExpansionModule, RouterLinkActive, RouterModule, RouterLink, NgClass,CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
     currentUserRole: string | null = null;
     token:any;
    // isSidebarToggled
    isSidebarToggled = false;
   

    // isToggled
    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        private userService:UserService,
        public themeService: CustomizerSettingsService,
         private authService: AuthService,
         private router : Router
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
modules = [
  {
    name: 'Vente',
    icon: 'shopping_cart',
    items: [
      { label: 'CA par mois', link: '/vente/mois' },
      { label: 'CA par client', link: '/vente/client' }
    ]
  },
  {
    name: 'Achat',
    icon: 'shopping_bag',
    items: [
      { label: 'CA par mois', link: '/achat/mois' },
      { label: 'CA par fournisseur', link: '/achat/fournisseur' }
    ]
  },
  {
    name: 'Stock',
    icon: 'inventory_2',
    items: [
      { label: 'Produits en stock', link: '/stock/list' },
      { label: 'Mouvements', link: '/stock/mouvements' }
    ]
  },
  {
    name: 'Recouvrement',
    icon: 'credit_card',
    items: [
      { label: 'Factures impayées', link: '/recouvrement/factures' },
      { label: 'Historique paiements', link: '/recouvrement/historique' }
    ]
  },
  {
    name: 'Analyse',
    icon: 'analytics',
    items: [
      { label: 'Graphiques de vente', link: '/analyse/vente' },
      { label: 'Performance', link: '/analyse/performance' }
    ]
  }
];

 ngOnInit(): void {
  if (typeof localStorage !== "undefined"){
    this.token = localStorage.getItem('accessToken');
  }
     if (this.token) {
    // Récupérer l'utilisateur connecté en utilisant le token
    this.userService.getUserConnected(this.token)
    const subscription = this.authService.currentUser$
    .subscribe(
      (user) => {
       if (user) {
        this.currentUserRole = user.role; }
        else {
          this.currentUserRole = null;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté :', error);
        this.currentUserRole = null;
      })}
 
 }
 

    logout() {
    this.authService.logout();
    this.router.navigate(['/authentication']);
  }
   
    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

}