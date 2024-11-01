import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '@app/@shared/services/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    console.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
