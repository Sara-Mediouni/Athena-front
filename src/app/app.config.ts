import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './apps/loader/spinner.interceptor';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from './Service/AuthService';
import { MatDateFormats } from '@angular/material/core';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(MatMomentDateModule), 
        provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync() ,  provideHttpClient(),
    
    provideHttpClient(withInterceptors([spinnerInterceptor])), 
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
     {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    },

    {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => () => authService.loadUserFromLocalStorage(),
  deps: [AuthService],
  multi: true
}
  ]
};