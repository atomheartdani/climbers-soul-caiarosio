import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationGuard } from '@app/@shared/guards/authentication.guard';
import { AuthenticationService } from '@app/@shared/services/authentication.service';
import { CredentialsService } from '@app/@shared/services/credentials.service';

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
    private snackBar: MatSnackBar,
  ) {}

  login() {
    this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot);
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: () => {
        this.snackBar.open('Logout effettuato con successo', 'Chiudi', { duration: 2000 });
        this.router.navigate(['/'], { replaceUrl: true });
      },
      error: () => {
        this.snackBar.open('Errore durante il logout', 'Chiudi', { duration: 10000 });
      },
    });
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
