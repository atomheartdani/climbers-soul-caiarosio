import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/@shared/confirm-dialog/confirm-dialog.component';
import { Opening } from '@app/@shared/models/opening.model';
import { AuthenticationGuard, CredentialsService } from '@app/auth';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';
import { OpeningDetailDialogComponent } from './opening-detail-dialog/opening-detail-dialog.component';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
})
export class OpeningComponent implements OnInit {
  @Input() opening: Opening;
  @Output() refreshEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private authGuard: AuthenticationGuard,
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  insertReservation(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(InsertReservationDialogComponent, { data: this.opening });
      dialogRef.afterClosed().subscribe((result) => {
        this.refreshEvent.emit('refresh');
      });
    }
  }

  removeReservation(): void {
    let action = 'Sei sicuro di voler annullare la tua prenotazione?';
    let detail = this.opening.date + ' ' + this.opening.from + '-' + this.opening.to;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { confirmAction: action, confirmDetail: detail },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 0) {
        // TODO delete reservation
        this.refreshEvent.emit('refresh');
      }
    });
  }

  manage(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(OpeningDetailDialogComponent, { data: this.opening });
      dialogRef.afterClosed().subscribe((result) => {
        this.refreshEvent.emit('refresh');
      });
    }
  }

  get spaceAvaiable(): boolean {
    return this.opening.reservations.length < 4;
  }

  get spaceAlmostFull(): boolean {
    return this.opening.reservations.length >= 4 && this.opening.reservations.length < 8;
  }

  get spaceFull(): boolean {
    return this.opening.reservations.length >= 8;
  }

  get isSpecialEvent(): boolean {
    return !!this.opening.special;
  }

  get isLoggedUserAdmin(): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return this.credentialsService.credentials?.isAdmin!;
    }
    return false;
  }

  get isLoggedUserAlreadyReserved(): boolean {
    if (this.credentialsService.isAuthenticated()) {
      let loggedUserid = this.credentialsService.credentials?.id;
      return this.opening.reservations.some((r) => r.userId == loggedUserid);
    }
    return false;
  }

  get tooltip(): string {
    if (this.spaceFull || this.isSpecialEvent) {
      return 'Non sono disponibili posti per questo giorno';
    } else if (this.spaceAlmostFull) {
      return 'Posti quasi esauriti';
    } else {
      return '';
    }
  }
}
