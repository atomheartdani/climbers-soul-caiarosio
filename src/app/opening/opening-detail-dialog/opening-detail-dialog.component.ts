import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opening } from '@app/@shared/models/opening.model';
import { User } from '@app/@shared/models/user.model';
import { OpeningService } from '@app/@shared/services/opening.service';
import { UserService } from '@app/@shared/services/user.service';
import { Moment } from 'moment';

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

    this.openingService.saveOpening(toSave).subscribe({
      next: () => {
        this.isProgressing = false;
        this.snackBar.open('Salvataggio completato', 'Chiudi', { duration: 2000 });
        this.dialogRef.close(0);
      },
      error: (e) => {
        this.isProgressing = false;
        let error: string = "C'è stato un errore durante il salvataggio. ";
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
