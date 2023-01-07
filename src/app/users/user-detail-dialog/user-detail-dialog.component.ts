import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/@shared/models/user.model';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss'],
})
export class UserDetailDialogComponent implements OnInit {
  detailForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User
  ) {
    this.user = data;
    this.detailForm = fb.group({
      username: [this.data.username, [Validators.required]],
      firstname: [this.data.firstname, [Validators.required]],
      lastname: [this.data.lastname, [Validators.required]],
      email: [this.data.email, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('50vw', '');
  }
}
