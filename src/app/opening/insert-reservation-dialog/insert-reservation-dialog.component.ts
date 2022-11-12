import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Opening } from '@app/@shared/models/opening.model';

@Component({
  selector: 'app-insert-reservation-dialog',
  templateUrl: './insert-reservation-dialog.component.html',
  styleUrls: ['./insert-reservation-dialog.component.scss'],
})
export class InsertReservationDialogComponent implements OnInit {
  opening: Opening;

  constructor(
    private dialogRef: MatDialogRef<InsertReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Opening
  ) {
    this.opening = data;
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(1);
  }

  save(): void {
    // TODO save
    this.dialogRef.close(1);
  }
}
