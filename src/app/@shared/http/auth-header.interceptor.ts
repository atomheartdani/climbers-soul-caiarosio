import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth/credentials.service';
import { Observable } from 'rxjs';

/**
 * Add authentication header to all request
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private credentialService: CredentialsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const creds = this.credentialService.credentials;

    if (creds != null) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${creds.token}` },
      });
    }
    return next.handle(request);
  }
}
