import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opening } from '@app/@shared/models/opening.model';
import { Reservation } from '@app/@shared/models/reservation.model';
import { ReservationService } from '@app/@shared/services/reservation.service';

@Component({
  selector: 'app-insert-reservation-dialog',
  templateUrl: './insert-reservation-dialog.component.html',
  styleUrls: ['./insert-reservation-dialog.component.scss'],
})
export class InsertReservationDialogComponent implements OnInit {
  isProgressing: boolean = false;
  opening: Opening;
  userId: number;

  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<InsertReservationDialogComponent>,
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
    };

    this.reservationService.saveReservation(toSave).subscribe({
      next: () => {
        this.isProgressing = false;
        this.snackBar.open('Salvataggio completato', 'Chiudi', { duration: 2000 });
        this.dialogRef.close(0);
      },
      error: () => {
        this.isProgressing = false;
        this.snackBar.open("C'è stato un errore durante il salvataggio", 'Chiudi', { duration: 10000 });
      },
    });
  }
}
