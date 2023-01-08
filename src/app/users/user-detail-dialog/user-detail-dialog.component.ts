import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';

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
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User
  ) {
    this.user = data;
    this.detailForm = fb.group({
      username: [this.data.username, [Validators.required]],
      firstname: [this.data.firstname, [Validators.required]],
      lastname: [this.data.lastname, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('50vw', '');

    let firstnameCtrl = this.detailForm.get('firstname');
    let lastnameCtrl = this.detailForm.get('lastname');

    firstnameCtrl?.valueChanges.subscribe((firstname: string) => {
      firstnameCtrl?.patchValue(this.capitalize(firstname), { emitEvent: false });
      let lastname = lastnameCtrl?.value;
      this.updateUsername(firstname, lastname);
    });

    lastnameCtrl?.valueChanges.subscribe((lastname) => {
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
      isAdmin: this.user.isAdmin,
      updatePassword: this.user.updatePassword,
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

  setAdmin(isAdmin: boolean): void {
    this.user.isAdmin = isAdmin;
    this.save();
  }

  setUpdatePassword(): void {
    this.user.updatePassword = true;
    this.save();
  }
}