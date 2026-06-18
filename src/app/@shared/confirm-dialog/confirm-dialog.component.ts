import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmData } from './confirm-dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
})
export class ConfirmDialogComponent {
  private dialogRef = inject<MatDialogRef<ConfirmDialogComponent>>(MatDialogRef);
  private data = inject<ConfirmData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close(1);
  }

  ok(): void {
    this.dialogRef.close(0);
  }

  get confirmAction(): string {
    return this.data.confirmAction;
  }

  get confirmDetail(): string {
    return this.data.confirmDetail;
  }
}
