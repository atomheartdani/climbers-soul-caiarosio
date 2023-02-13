import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { CredentialsService } from '@app/auth';
import { debounceTime } from 'rxjs';
import { UsernameValidator } from './username.validator';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss'],
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
    @Inject(MAT_DIALOG_DATA) private data: User
  ) {
    this.user = data;
    this.detailForm = fb.group({
      username: [this.data.username, [Validators.required], [usernameValidator]],
      firstname: [this.data.firstname, [Validators.required]],
      lastname: [this.data.lastname, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      tosConsent: [this.data.tosConsent],
      isCaiArosio: [this.data.isCaiArosio],
      isVerified: [this.data.isVerified],
      canManageOpenings: [{ value: this.data.canManageOpenings, disabled: this.isMyself }],
      canManageUsers: [{ value: this.data.canManageUsers, disabled: this.isMyself }],
    });
  }

  ngOnInit(): void {
    let firstnameCtrl = this.detailForm.get('firstname');
    let lastnameCtrl = this.detailForm.get('lastname');

    firstnameCtrl?.valueChanges.pipe(debounceTime(500)).subscribe((firstname: string) => {
      firstnameCtrl?.patchValue(this.capitalize(firstname), { emitEvent: false });
      let lastname = lastnameCtrl?.value;
      this.updateUsername(firstname, lastname);
    });

    lastnameCtrl?.valueChanges.pipe(debounceTime(500)).subscribe((lastname: string) => {
      lastnameCtrl?.patchValue(this.capitalize(lastname), { emitEvent: false });
      let firstname = firstnameCtrl?.value;
      this.updateUsername(firstname, lastname);
    });
  }

  close(): void {
    this.dialogRef.close(1);
  }

  save(): void {
    this.isProgressing = true;
    let ctrls = this.detailForm.controls;
    const toSave: User = {
      id: this.user.id,
      username: ctrls['username'].value,
      firstname: ctrls['firstname'].value,
      lastname: ctrls['lastname'].value,
      email: ctrls['email'].value,
      tosConsent: ctrls['tosConsent'].value,
      isCaiArosio: ctrls['isCaiArosio'].value,
      updatePassword: this.user.updatePassword,
      canManageOpenings: ctrls['canManageOpenings'].value,
      canManageUsers: ctrls['canManageUsers'].value,
      isVerified: ctrls['isVerified'].value,
    };

    this.userService.saveUser(toSave).subscribe({
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
    let splitted = value.split(' ');
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
