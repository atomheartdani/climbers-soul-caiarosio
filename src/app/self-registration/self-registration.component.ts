import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { UserRegistration } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { UpdatePasswordValidator } from '@app/@shared/validators/update-password.validator';
import { UsernameValidator } from '@app/@shared/validators/username.validator';
import { debounceTime, finalize } from 'rxjs';

const passwordMinLength: number = 12;

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
})
export class SelfRegistrationComponent implements OnInit {
  selfRegistrationForm: FormGroup;
  isProgressing: boolean = false;
  showSectionHint: boolean = false;

  constructor(
    private usernameValidator: UsernameValidator,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.selfRegistrationForm = fb.group(
      {
        username: ['', [Validators.required], [usernameValidator]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        caiSection: ['', [Validators.required]],
        newPassword1: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
        newPassword2: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
      },
      {
        validator: UpdatePasswordValidator.matchNewPasswords,
      },
    );
  }

  ngOnInit(): void {
    const firstnameCtrl = this.selfRegistrationForm.get('firstname');
    const lastnameCtrl = this.selfRegistrationForm.get('lastname');
    const caiSectionCtrl = this.selfRegistrationForm.get('caiSection');

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

  save(stepper: MatStepper): void {
    this.isProgressing = true;
    const ctrls = this.selfRegistrationForm.controls;
    const toSave: UserRegistration = {
      username: ctrls['username'].value,
      firstname: ctrls['firstname'].value,
      lastname: ctrls['lastname'].value,
      email: ctrls['email'].value,
      caiSection: ctrls['caiSection'].value,
      password: ctrls['newPassword1'].value,
    };

    this.userService
      .registerUser(toSave)
      .pipe(finalize(() => (this.isProgressing = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Salvataggio completato', 'Chiudi', { duration: 2000 });
          stepper.next();
        },
        error: () => {
          const error: string = "C'è stato un errore durante il salvataggio. Riprovare più tardi";
          this.snackBar.open(error, 'Chiudi', { duration: 10000 });
        },
      });
  }

  updateUsername(firstname: string, lastname: string): void {
    let username: string = firstname + '.' + lastname;
    if (username.startsWith('.')) {
      username = username.substring(1);
    }
    if (username.endsWith('.')) {
      username = username.slice(0, -1);
    }
    username = username.replaceAll(' ', '').toLowerCase();
    this.selfRegistrationForm.get('username')?.markAsTouched();
    this.selfRegistrationForm.get('username')?.setValue(username);
  }

  capitalize(value: string): string {
    const splitted = value.split(' ');
    for (let i = 0; i < splitted.length; i++) {
      splitted[i] = splitted[i][0].toUpperCase() + splitted[i].substring(1);
    }
    return splitted.join(' ');
  }

  get pwdMinLength(): number {
    return passwordMinLength;
  }
}
