import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsService } from '../services/credentials.service';

/**
 * Add authentication header to all request
 */
@Injectable({
  providedIn: 'root',
})
export class AuthHeaderInterceptor implements HttpInterceptor {
  private credentialService = inject(CredentialsService);

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
