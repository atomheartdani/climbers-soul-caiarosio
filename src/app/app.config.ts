import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouteReuseStrategy, withHashLocation } from '@angular/router';
import { ApiPrefixInterceptor } from './@shared/http/api-prefix.interceptor';
import { AuthExpiredInterceptor } from './@shared/http/auth-expired.interceptor';
import { AuthHeaderInterceptor } from './@shared/http/auth-header.interceptor';
import { CacheInterceptor } from './@shared/http/cache.interceptor';
import { ErrorHandlerInterceptor } from './@shared/http/error-handler.interceptor';
import { IsoDateAdapter } from './@shared/iso-date-adapter';
import { MatPaginatorIntlIta } from './@shared/mat-paginator-intl-ita';
import { RouteReusableStrategy } from './@shared/route-reusable-strategy';
import { CredentialsService } from './@shared/services/credentials.service';
import { routes } from './app.routes';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMM YY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withHashLocation()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true, deps: [CredentialsService] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthExpiredInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: RouteReusableStrategy },
    { provide: DateAdapter, useClass: IsoDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlIta },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { ...new MatDialogConfig(), panelClass: 'mat-dialog-responsive' } as MatDialogConfig,
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
};
