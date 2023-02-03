import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

/**
 * Catches 401 responses and redirects to login page
 */
@Injectable({
  providedIn: 'root',
})
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: () => {},
        error: (e) => {
          if (e instanceof HttpErrorResponse) {
            if (e.status !== 401) {
              return;
            }
            let redirectUrl: string = this.router.routerState.snapshot.url;
            this.router.navigate(['/login'], { queryParams: { redirect: redirectUrl }, replaceUrl: true });
          }
        },
      })
    );
  }
}
