import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Opening } from '@app/@shared/models/opening.model';
import { AuthenticationGuard, CredentialsService } from '@app/auth';
import { DeleteReservationDialogComponent } from './delete-reservation-dialog/delete-reservation-dialog.component';
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
      const dialogRef = this.dialog.open(InsertReservationDialogComponent, {
        data: { opening: this.opening, userId: this.credentialsService.credentials?.id },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.refreshEvent.emit('refresh');
      });
    }
  }

  removeReservation(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(DeleteReservationDialogComponent, {
        data: { opening: this.opening, userId: this.credentialsService.credentials?.id },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.refreshEvent.emit('refresh');
      });
    }
  }

  manage(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(OpeningDetailDialogComponent, { data: this.opening });
      dialogRef.afterClosed().subscribe((result) => {
        this.refreshEvent.emit('refresh');
      });
    }
  }

  fullnessPercent(): number {
    return this.occupiedSpaces / this.opening.maxReservations;
  }

  get spaceAvaiable(): boolean {
    return this.fullnessPercent() < 0.5;
  }

  get spaceAlmostFull(): boolean {
    return this.fullnessPercent() >= 0.5 && this.fullnessPercent() < 1;
  }

  get spaceFull(): boolean {
    return this.fullnessPercent() >= 1;
  }

  get isSpecialEvent(): boolean {
    return !!this.opening.special;
  }

  get canManageOpenings(): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return this.credentialsService.credentials?.canManageOpenings!;
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

  get occupiedSpaces(): number {
    let reservedSpots: number = this.opening.reservations.length;
    this.opening.reservations.forEach((r) => {
      if (r.reservePartner) {
        reservedSpots++;
      }
    });
    return reservedSpots;
  }

  get remainingSpaces(): number {
    return this.opening.maxReservations - this.occupiedSpaces;
  }

  get tooltip(): string {
    if (this.isSpecialEvent) {
      return 'Evento speciale. Verificare sul sito del CAI Arosio';
    } else if (this.spaceFull) {
      return 'Non ci sono posti disponibili per questo giorno';
    } else if (this.spaceAlmostFull) {
      return 'Posti quasi esauriti';
    } else if (!this.isReservable) {
      return 'Iscrizioni non ancora aperte';
    } else {
      return '';
    }
  }

  get isReservable(): boolean {
    const openingDate = new Date(this.opening.date);
    const today = new Date();
    const msBetweenDates = Math.abs(openingDate.getTime() - today.getTime());
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);
    return daysBetweenDates <= 30;
  }
}
