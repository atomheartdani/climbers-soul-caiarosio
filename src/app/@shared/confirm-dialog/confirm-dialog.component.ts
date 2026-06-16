import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
})
export class ConfirmDialogComponent {
  private dialogRef = inject<MatDialogRef<ConfirmDialogComponent>>(MatDialogRef);
  private data = inject<{ confirmAction: string; confirmDetail: string }>(MAT_DIALOG_DATA);

  confirmAction: string = '';
  confirmDetail: string = '';

  constructor() {
    this.confirmAction = this.data.confirmAction;
    this.confirmDetail = this.data.confirmDetail;
  }

  close(): void {
    this.dialogRef.close(1);
  }

  ok(): void {
    this.dialogRef.close(0);
  }
}
