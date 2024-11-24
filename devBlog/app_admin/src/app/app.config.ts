import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptProvider, jwtInterceptorFn } from './utils/jwt.interceptor';


//this file is not matched to the resource guide
//seems to be the correct changes made to it though as of mod 7.  
export const appConfig: ApplicationConfig = 
{
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([jwtInterceptorFn]))
  ]
};
