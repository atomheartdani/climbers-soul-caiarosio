import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  confirmAction: string = '';
  confirmDetail: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { confirmAction: string; confirmDetail: string },
  ) {
    this.confirmAction = data.confirmAction;
    this.confirmDetail = data.confirmDetail;
  }

  close(): void {
    this.dialogRef.close(1);
  }

  ok(): void {
    this.dialogRef.close(0);
  }
}
