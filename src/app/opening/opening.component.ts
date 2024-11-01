import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Opening } from '@app/@shared/models/opening.model';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { AuthenticationGuard } from '@app/auth/authentication.guard';
import { DeleteReservationDialogComponent } from './delete-reservation-dialog/delete-reservation-dialog.component';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';
import { OpeningDetailDialogComponent } from './opening-detail-dialog/opening-detail-dialog.component';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
})
export class OpeningComponent {
  @Input() opening: Opening;
  @Output() refreshEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private authGuard: AuthenticationGuard,
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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

  private fullnessPercent(): number {
    return this.getOccupiedSpaces() / this.opening.maxReservations;
  }

  private getOccupiedSpaces(): number {
    let reservedSpots: number = this.opening.reservations.length;
    this.opening.reservations.forEach((r) => {
      if (r.reservePartner) {
        reservedSpots++;
      }
    });
    return reservedSpots;
  }

  private daysUntilOpening(): number {
    const openingDate = new Date(this.opening.date);
    const today = new Date();
    const msBetweenDates = openingDate.getTime() - today.getTime();
    return msBetweenDates / (24 * 60 * 60 * 1000);
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
      const loggedUserid = this.credentialsService.credentials?.id;
      return this.opening.reservations.some((r) => r.userId == loggedUserid);
    }
    return false;
  }

  get isAfterCutoff(): boolean {
    const openingDate = new Date(this.opening.date);
    const today = new Date();

    // Se ci sono gia' altre prenotazioni, ci si puo' prenotare
    if (this.opening.reservations.length > 0) {
      return false;
    }

    if (openingDate.getMonth() === today.getMonth()) {
      if (openingDate.getDay() === 6) {
        // Apertura di sabato
        if (openingDate.getDate() === today.getDate()) {
          // "oggi" e' il sabato dell'apertura
          return true;
        }
        if (openingDate.getDate() === today.getDate() + 1) {
          // "oggi" e' il venerdi' precedente l'apertura
          if (today.getHours() >= 21) {
            // Siamo oltre le 21 del venerdi'
            return true;
          }
        }
      }
    }
    return false;
  }

  get isReservable(): boolean {
    return this.daysUntilOpening() <= 30 && !this.isAfterCutoff;
  }

  get icon(): string {
    if (this.spaceFull) {
      return 'dangerous';
    } else if (this.spaceAlmostFull) {
      return 'warning';
    } else {
      return 'check_circle';
    }
  }

  get description1(): string {
    if (!!this.opening.special) {
      return 'Evento speciale';
    } else if (this.daysUntilOpening() >= 30) {
      return 'Prenotazioni non ancora aperte';
    } else if (this.isAfterCutoff) {
      return 'Prenotazioni chiuse';
    } else {
      return 'Orari: ' + this.opening.from + ' - ' + this.opening.to;
    }
  }

  get description2(): string {
    if (!!this.opening.special) {
      return this.opening.special;
    } else if (this.isAfterCutoff) {
      return 'La palestra rimarrà chiusa';
    } else {
      const remainingSpaces = this.opening.maxReservations - this.getOccupiedSpaces();
      return 'Posti disponibili: ' + remainingSpaces + '/' + this.opening.maxReservations;
    }
  }
}
