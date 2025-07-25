import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthService } from './app/Service/AuthService';

bootstrapApplication(AppComponent, {

  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes) ,
     {
      provide: 'APP_INITIALIZER',
      useFactory: (authService: AuthService) => () => authService.initAuth(),
      deps: [AuthService],
      multi: true
    } 
  ]
});
