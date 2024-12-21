import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opening } from '@app/@shared/models/opening.model';
import { Reservation } from '@app/@shared/models/reservation.model';
import { ReservationService } from '@app/@shared/services/reservation.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-delete-reservation-dialog',
  templateUrl: './delete-reservation-dialog.component.html',
  styleUrls: ['./delete-reservation-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
})
export class DeleteReservationDialogComponent {
  isProgressing: boolean = false;
  opening: Opening;
  userId: number;

  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { opening: Opening; userId: number },
  ) {
    this.opening = data.opening;
    this.userId = data.userId;
  }

  close(): void {
    this.dialogRef.close(1);
  }

  save(): void {
    this.isProgressing = true;
    const toSave: Reservation = {
      id: 0,
      openingId: this.opening.id,
      userId: this.userId,
      reservePartner: false,
    };

    this.reservationService
      .deleteReservation(toSave)
      .pipe(finalize(() => (this.isProgressing = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Prenotazione cancellata', 'Chiudi', { duration: 2000 });
          this.dialogRef.close(0);
        },
        error: () => {
          const error: string = "C'è stato un errore durante la cancellazione della prenotazione. Riprovare più tardi";
          this.snackBar.open(error, 'Chiudi', { duration: 10000 });
        },
      });
  }
}
