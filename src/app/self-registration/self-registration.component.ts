import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { UserRegistration } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { UpdatePasswordValidator } from '@app/@shared/validators/update-password.validator';
import { UsernameValidator } from '@app/@shared/validators/username.validator';
import { debounceTime } from 'rxjs';

const passwordMinLength: number = 12;
const mainCaiSection: string = 'arosio';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss'],
})
export class SelfRegistrationComponent implements OnInit {
  selfRegistrationForm: FormGroup;
  isProgressing: boolean = false;
  showSectionHint: boolean = false;

  constructor(
    private usernameValidator: UsernameValidator,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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
      }
    );
  }

  ngOnInit(): void {
    let firstnameCtrl = this.selfRegistrationForm.get('firstname');
    let lastnameCtrl = this.selfRegistrationForm.get('lastname');
    let caiSectionCtrl = this.selfRegistrationForm.get('caiSection');

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

    caiSectionCtrl?.valueChanges.pipe(debounceTime(500)).subscribe((caiSection: string) => {
      caiSectionCtrl?.patchValue(this.capitalize(caiSection), { emitEvent: false });
      this.sectionCheck(caiSection);
    });
  }

  save(stepper: MatStepper): void {
    this.isProgressing = true;
    let ctrls = this.selfRegistrationForm.controls;
    const toSave: UserRegistration = {
      username: ctrls['username'].value,
      firstname: ctrls['firstname'].value,
      lastname: ctrls['lastname'].value,
      email: ctrls['email'].value,
      caiSection: ctrls['caiSection'].value,
      password: ctrls['newPassword1'].value,
    };

    this.userService.registerUser(toSave).subscribe({
      next: () => {
        this.isProgressing = false;
        this.snackBar.open('Salvataggio completato', 'Chiudi', { duration: 2000 });
        stepper.next();
      },
      error: (e) => {
        this.isProgressing = false;
        let error: string = "C'è stato un errore durante il salvataggio. Riprovare più tardi";
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
    let splitted = value.split(' ');
    for (let i = 0; i < splitted.length; i++) {
      splitted[i] = splitted[i][0].toUpperCase() + splitted[i].substring(1);
    }
    return splitted.join(' ');
  }

  sectionCheck(caiSection: string) {
    const lowerCaiSection = caiSection.toLowerCase();
    if (
      lowerCaiSection === mainCaiSection ||
      lowerCaiSection.includes(' ' + mainCaiSection) ||
      lowerCaiSection.includes(mainCaiSection + ' ')
    ) {
      this.showSectionHint = true;
    } else {
      this.showSectionHint = false;
    }
  }

  get pwdMinLength(): number {
    return passwordMinLength;
  }
}
