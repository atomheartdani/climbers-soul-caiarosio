import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opening } from '@app/@shared/models/opening.model';
import { Reservation } from '@app/@shared/models/reservation.model';
import { ReservationService } from '@app/@shared/services/reservation.service';

@Component({
  selector: 'app-delete-reservation-dialog',
  templateUrl: './delete-reservation-dialog.component.html',
  styleUrls: ['./delete-reservation-dialog.component.scss'],
})
export class DeleteReservationDialogComponent implements OnInit {
  isProgressing: boolean = false;
  opening: Opening;
  userId: number;

  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { opening: Opening; userId: number }
  ) {
    this.opening = data.opening;
    this.userId = data.userId;
  }

  ngOnInit(): void {}

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

    this.reservationService.deleteReservation(toSave).subscribe({
      next: () => {
        this.isProgressing = false;
        this.snackBar.open('Prenotazione cancellata', 'Chiudi', { duration: 2000 });
        this.dialogRef.close(0);
      },
      error: (e) => {
        this.isProgressing = false;
        let error: string = "C'è stato un errore durante la cancellazione della prenotazione. ";
        if (e['status'] === 401) {
          error += "Rieseguire l'accesso";
          this.dialogRef.close(0);
        } else {
          error += 'Riprovare più tardi';
        }
        this.snackBar.open(error, 'Chiudi', { duration: 10000 });
      },
    });
  }
}
