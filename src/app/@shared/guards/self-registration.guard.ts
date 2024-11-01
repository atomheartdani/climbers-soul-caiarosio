import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '@app/@shared/services/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class SelfRegistrationGuard implements CanActivate {
  constructor(private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
