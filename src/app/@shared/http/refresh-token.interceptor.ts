import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * Add authentication header to all request
 */
@Injectable({
  providedIn: 'root',
})
export class RefreshToeknInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService,
    private jwtHelper: JwtHelperService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // No need to refresh token on login or refreshToken calls
    if (request.url.indexOf('login') > -1 || request.url.indexOf('refreshtoken') > -1) {
      return next.handle(request);
    }

    const creds = this.credentialService.credentials;
    if (creds) {
      let isTokenExpired = this.jwtHelper.isTokenExpired(creds.accessToken);

      if (isTokenExpired) {
        return this.authenticationService.refreshToken(creds.accessToken, creds.refreshToken).pipe(
          switchMap((result: any) => {
            const newCreds = this.credentialService.credentials;
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${newCreds!.accessToken}` },
            });
            /*request = request.clone({
              headers: request.headers.set('Authorization', `bearer ${newCreds!.token}`),
            });*/
            return next.handle(request);
          })
        );
      }
    }
    return next.handle(request);
  }
}
