import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CredentialsService } from '@app/auth';
import { UntilDestroy, untilDestroyed } from '@shared';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(
    private breakpoint: BreakpointObserver,
    private credentialsService: CredentialsService,
  ) {}

  ngOnInit() {
    // Automatically close side menu on screens > small breakpoint
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        filter(({ matches }) => !matches),
        untilDestroyed(this),
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
