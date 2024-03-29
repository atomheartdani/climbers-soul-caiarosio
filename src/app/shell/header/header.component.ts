import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationGuard, AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private authGuard: AuthenticationGuard,
    private route: ActivatedRoute,
  ) {}

  login() {
    this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/'], { replaceUrl: true }));
  }

  get firstname(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.firstname : null;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get canManageUsers(): boolean {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.canManageUsers : false;
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
