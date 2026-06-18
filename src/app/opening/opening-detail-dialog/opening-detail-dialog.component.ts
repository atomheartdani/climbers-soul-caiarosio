import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/@shared/confirm-dialog/confirm-dialog.component';
import { ConfirmData } from '@app/@shared/confirm-dialog/confirm-dialog.model';
import { AuthenticationGuard } from '@app/@shared/guards/authentication.guard';
import { Opening } from '@app/@shared/models/opening.model';
import { User } from '@app/@shared/models/user.model';
import { OpeningService } from '@app/@shared/services/opening.service';
import { UserService } from '@app/@shared/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-opening-detail-dialog',
  templateUrl: './opening-detail-dialog.component.html',
  styleUrls: ['./opening-detail-dialog.component.scss'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class OpeningDetailDialogComponent implements OnInit {
  private authGuard = inject(AuthenticationGuard);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private openingService = inject(OpeningService);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject<MatDialogRef<OpeningDetailDialogComponent>>(MatDialogRef);
  private data = inject<Opening>(MAT_DIALOG_DATA);

  readonly TIME_PATTERN: string = '([01]?[0-9]|2[0-3]):[0-5][0-9]';

  detailForm: FormGroup;
  isProgressing = signal<boolean>(false);
  opening: Opening;
  userList: User[] = [];

  constructor() {
    this.opening = this.data;
    this.detailForm = this.formBuilder.group({
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

  changeDate(i: MatDatepickerInputEvent<Date>) {
    this.detailForm.controls['date'].setValue(i.value);
  }

  close(): void {
    this.dialogRef.close(1);
  }

  delete(): void {
    this.isProgressing.set(true);
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const data = {
        confirmAction: "Stai per cancellare l'apertura del " + this.opening.date,
        confirmDetail: 'Confermi?',
      } satisfies ConfirmData;

      const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });

      dialogRef
        .afterClosed()
        .pipe(finalize(() => this.isProgressing.set(false)))
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
          }
        });
    }
  }

  save(): void {
    this.isProgressing.set(true);
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
      .pipe(finalize(() => this.isProgressing.set(false)))
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
