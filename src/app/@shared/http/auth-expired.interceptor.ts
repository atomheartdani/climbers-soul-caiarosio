import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';

/**
 * Catches 401 responses and redirects to login page
 */
@Injectable({
  providedIn: 'root',
})
export class AuthExpiredInterceptor implements HttpInterceptor {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e) => {
        if (e instanceof HttpErrorResponse) {
          if (e.status !== 401) {
            const error = e.error?.message || e.statusText;
            return throwError(() => error);
          }
          this.dialog.closeAll();
          this.showWarning();
          const redirectUrl: string = this.router.routerState.snapshot.url;
          this.router.navigate(['/login'], { queryParams: { redirect: redirectUrl }, replaceUrl: true });
        }
        return EMPTY;
      }),
    );
  }

  private showWarning() {
    const error: string = "C'è stato un errore durante l'esecuzione della richiesta. Rieseguire l'accesso";
    this.snackBar.open(error, 'Chiudi', { duration: 10000 });
  }
}
