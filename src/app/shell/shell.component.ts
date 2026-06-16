import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [HeaderComponent, MatDividerModule, MatListModule, MatSidenavModule, RouterModule],
})
export class ShellComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(
    private breakpoint: BreakpointObserver,
    private credentialsService: CredentialsService,
  ) {
    this.toggleSidenavListener();
  }

  private toggleSidenavListener() {
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        filter(({ matches }) => !matches),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.sidenav) {
          this.sidenav.close();
        }
      });
  }

  get canManageUsers(): boolean {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.canManageUsers : false;
  }
}
