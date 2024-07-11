import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/@shared/confirm-dialog/confirm-dialog.component';
import { Opening } from '@app/@shared/models/opening.model';
import { User } from '@app/@shared/models/user.model';
import { OpeningService } from '@app/@shared/services/opening.service';
import { UserService } from '@app/@shared/services/user.service';
import { AuthenticationGuard } from '@app/auth';
import { Moment } from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-opening-detail-dialog',
  templateUrl: './opening-detail-dialog.component.html',
  styleUrls: ['./opening-detail-dialog.component.scss'],
})
export class OpeningDetailDialogComponent implements OnInit {
  readonly TIME_PATTERN: string = '([01]?[0-9]|2[0-3]):[0-5][0-9]';

  detailForm: FormGroup;
  isProgressing: boolean = false;
  opening: Opening;
  userList: User[] = [];

  constructor(
    private authGuard: AuthenticationGuard,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private openingService: OpeningService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OpeningDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Opening,
  ) {
    this.opening = data;
    this.detailForm = fb.group({
      date: [this.data.date, [Validators.required]],
      from: [this.data.from, [Validators.required, Validators.pattern(this.TIME_PATTERN)]],
      to: [this.data.to, [Validators.required, Validators.pattern(this.TIME_PATTERN)]],
      special: [this.data.special],
      maxReservations: [this.data.maxReservations, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const userIds = this.opening.reservations.map((r) => r.userId);
    this.userService.getUsersFromIds(userIds).subscribe((result) => {
      userIds.forEach((uid) => {
        const user = result.find((u) => u.id === uid);
        if (user !== undefined) {
          const reservation = this.opening.reservations.find((r) => r.userId === user?.id);
          if (reservation?.reservePartner) {
            user.lastname = user.lastname + ' + 1';
          }
          this.userList.push(user);
        }
      });
    });
  }

  changeData(i: MatDatepickerInputEvent<Moment>) {
    const newDate: string = i.value!.format('YYYY-MM-DD');
    this.detailForm.controls['date'].setValue(newDate);
  }

  close(): void {
    this.dialogRef.close(1);
  }

  delete(): void {
    this.isProgressing = true;
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const action = "Stai per cancellare l'apertura del " + this.opening.date;
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { confirmAction: action, confirmDetail: 'Confermi?' },
      });
      dialogRef
        .afterClosed()
        .pipe(finalize(() => (this.isProgressing = false)))
        .subscribe((result) => {
          if (result === 0) {
            this.openingService.delete(this.opening.id).subscribe({
              next: () => {
                this.snackBar.open("Cancellazione dell'apertura completata", 'Chiudi', { duration: 2000 });
                this.dialogRef.close(0);
              },
              error: () => {
                const error: string = "C'è stato un errore durante la cancellazione. Riprovare più tardi";
                this.snackBar.open(error, 'Chiudi', { duration: 10000 });
              },
            });
          } else {
            this.isProgressing = false;
          }
        });
    }
  }

  save(): void {
    this.isProgressing = true;
    const ctrls = this.detailForm.controls;
    const toSave: Opening = {
      id: this.opening.id,
      date: ctrls['date'].value,
      from: ctrls['from'].value,
      to: ctrls['to'].value,
      special: ctrls['special'].value,
      maxReservations: ctrls['maxReservations'].value,
      reservations: this.opening.reservations,
    };

    this.openingService
      .saveOpening(toSave)
      .pipe(finalize(() => (this.isProgressing = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Salvataggio completato', 'Chiudi', { duration: 2000 });
          this.dialogRef.close(0);
        },
        error: () => {
          const error: string = "C'è stato un errore durante il salvataggio. Riprovare più tardi";
          this.snackBar.open(error, 'Chiudi', { duration: 10000 });
        },
      });
  }
}
