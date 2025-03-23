import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/@shared/models/user.model';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { UserService } from '@app/@shared/services/user.service';
import { UsernameValidator } from '@app/@shared/validators/username.validator';
import { debounceTime, finalize } from 'rxjs';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
})
export class UserDetailDialogComponent implements OnInit {
  detailForm: FormGroup;
  isProgressing: boolean = false;
  user: User;

  constructor(
    private credentialsService: CredentialsService,
    private usernameValidator: UsernameValidator,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User,
  ) {
    this.user = data;
    this.detailForm = fb.group({
      username: [this.data.username, [Validators.required], [usernameValidator]],
      firstname: [this.data.firstname, [Validators.required]],
      lastname: [this.data.lastname, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      caiSection: [this.data.caiSection, [Validators.required]],
      tosConsent: [this.data.tosConsent],
      isVerified: [this.data.isVerified],
      canManageOpenings: [{ value: this.data.canManageOpenings, disabled: this.isMyself }],
      canManageUsers: [{ value: this.data.canManageUsers, disabled: this.isMyself }],
    });
  }

  ngOnInit(): void {
    const firstnameCtrl = this.detailForm.get('firstname');
    const lastnameCtrl = this.detailForm.get('lastname');
    const caiSectionCtrl = this.detailForm.get('caiSection');

    firstnameCtrl?.valueChanges.pipe(debounceTime(500)).subscribe((firstname: string) => {
      const trimmed = firstname.trim();
      firstnameCtrl?.patchValue(this.capitalize(trimmed), { emitEvent: false });
      const lastname = lastnameCtrl?.value;
      this.updateUsername(trimmed, lastname);
    });

    lastnameCtrl?.valueChanges.pipe(debounceTime(500)).subscribe((lastname: string) => {
      const trimmed = lastname.trim();
      lastnameCtrl?.patchValue(this.capitalize(trimmed), { emitEvent: false });
      const firstname = firstnameCtrl?.value;
      this.updateUsername(firstname, trimmed);
    });

    caiSectionCtrl?.valueChanges.pipe(debounceTime(500)).subscribe((caiSection: string) => {
      const trimmed = caiSection.trim();
      caiSectionCtrl?.patchValue(this.capitalize(trimmed), { emitEvent: false });
    });
  }

  close(): void {
    this.dialogRef.close(1);
  }

  save(): void {
    this.isProgressing = true;
    const ctrls = this.detailForm.controls;
    const toSave: User = {
      id: this.user.id,
      username: ctrls['username'].value,
      firstname: ctrls['firstname'].value,
      lastname: ctrls['lastname'].value,
      email: ctrls['email'].value,
      caiSection: ctrls['caiSection'].value,
      tosConsent: ctrls['tosConsent'].value,
      updatePassword: this.user.updatePassword,
      canManageOpenings: ctrls['canManageOpenings'].value,
      canManageUsers: ctrls['canManageUsers'].value,
      isVerified: ctrls['isVerified'].value,
    };

    this.userService
      .saveUser(toSave)
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

  updateUsername(firstname: string, lastname: string): void {
    // Autocompila username solo se nuovo utente
    if (this.user.id === 0) {
      let username: string = firstname + '.' + lastname;
      if (username.startsWith('.')) {
        username = username.substring(1);
      }
      if (username.endsWith('.')) {
        username = username.slice(0, -1);
      }
      username = username.replaceAll(' ', '').toLowerCase();
      this.detailForm.get('username')?.markAsTouched();
      this.detailForm.get('username')?.setValue(username);
    }
  }

  capitalize(value: string): string {
    const splitted = value.split(' ');
    for (let i = 0; i < splitted.length; i++) {
      splitted[i] = splitted[i][0].toUpperCase() + splitted[i].substring(1);
    }
    return splitted.join(' ');
  }

  setUpdatePassword(): void {
    this.user.updatePassword = true;
    this.save();
  }

  get isMyself(): boolean {
    const credentials = this.credentialsService.credentials!;
    return credentials.id === this.user.id;
  }
}
