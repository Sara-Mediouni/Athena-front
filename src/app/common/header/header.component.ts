import { CommonModule, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../Service/AuthService';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../Service/UserService';
import { User } from '../../Model/User';
@Component({
    selector: 'app-header',
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink,CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    user: string | null = null;
    role: string | null = null;
    // isSidebarToggled
    isSidebarToggled = false;
    token:any;
    // isToggled
    isToggled = false;
    isLoading = true; 
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
    ngOnInit(): void {
    this.loadUser();  
  }
    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    
   loadUser(): void {
  if (typeof localStorage !== 'undefined') {
    this.token = localStorage.getItem('accessToken');

    if (this.token) {
      this.isLoading = true;

     
      this.authService.loadUserFromToken(this.token);

      
      const subscription = this.authService.currentUser$
        .subscribe(user => {
          if (user) {
            this.user = user.name;
            this.role = user.role;
            this.isLoading = false;
          } else {
            this.user = null;
            this.role = null;
            this.isLoading = false;
          }
        });
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