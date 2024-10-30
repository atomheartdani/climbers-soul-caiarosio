import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '@app/auth/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class SelfRegistrationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialService: CredentialsService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
