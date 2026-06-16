import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opening } from '@app/@shared/models/opening.model';
import { Reservation } from '@app/@shared/models/reservation.model';
import { ReservationService } from '@app/@shared/services/reservation.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-insert-reservation-dialog',
  templateUrl: './insert-reservation-dialog.component.html',
  styleUrls: ['./insert-reservation-dialog.component.scss'],
  imports: [FormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatRadioModule],
})
export class InsertReservationDialogComponent {
  private reservationService = inject(ReservationService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject<MatDialogRef<InsertReservationDialogComponent>>(MatDialogRef);
  private data = inject<{ opening: Opening; userId: number }>(MAT_DIALOG_DATA);

  reservePartner: boolean = false;
  isProgressing = signal(false);
  opening: Opening;
  userId: number;

  constructor() {
    this.opening = this.data.opening;
    this.userId = this.data.userId;
  }

  close(): void {
    this.dialogRef.close(1);
  }

  save(): void {
    this.isProgressing.set(true);
    const toSave: Reservation = {
      id: 0,
      openingId: this.opening.id,
      userId: this.userId,
      reservePartner: this.reservePartner,
    };

    this.reservationService
      .saveReservation(toSave)
      .pipe(finalize(() => this.isProgressing.set(false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Salvataggio completato', 'Chiudi', { duration: 2000 });
          this.dialogRef.close(0);
        },
        error: (e) => {
          let error: string = "C'è stato un errore durante il salvataggio. ";
          if (e['status'] === 409) {
            error += 'Numero massimo di prenotazioni raggiunto';
          } else {
            error += 'Riprovare più tardi';
          }
          this.snackBar.open(error, 'Chiudi', { duration: 10000 });
        },
      });
  }
}
