import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './apps/loader/spinner.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from './Service/AuthService';

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
        provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync() ,  provideHttpClient(),
    
    provideHttpClient(withInterceptors([spinnerInterceptor])), 
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => authService.loadUserFromLocalStorage(),
  deps: [AuthService],
  multi: true
}
  ]
};