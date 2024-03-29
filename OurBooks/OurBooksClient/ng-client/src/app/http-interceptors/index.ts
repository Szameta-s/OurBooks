import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppInterceptor } from './app-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
];