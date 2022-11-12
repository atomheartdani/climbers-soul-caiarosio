import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Opening } from '@app/@shared/models/opening.model';
import { InsertReservationDialogComponent } from '../insert-reservation-dialog/insert-reservation-dialog.component';

@Component({
  selector: 'app-opening-detail-dialog',
  templateUrl: './opening-detail-dialog.component.html',
  styleUrls: ['./opening-detail-dialog.component.scss'],
})
export class OpeningDetailDialogComponent implements OnInit {
  detailForm: FormGroup;
  opening: Opening;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InsertReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Opening
  ) {
    this.opening = data;
    this.detailForm = fb.group({
      from: [this.data.from, [Validators.required]],
      to: [this.data.to, [Validators.required]],
      special: [this.data.special],
    });
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('50vw', '');
  }

  close(): void {
    this.dialogRef.close(1);
  }

  save(): void {
    // TODO save
    this.dialogRef.close(1);
  }
}
