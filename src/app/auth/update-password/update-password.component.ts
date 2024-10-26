import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/@shared/services/user.service';
import { UpdatePasswordValidator } from '@app/@shared/validators/update-password.validator';
import { finalize } from 'rxjs';
import { Credentials, CredentialsService } from '../credentials.service';

const passwordMinLength: number = 12;

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private credentialsService: CredentialsService,
  ) {
    this.form = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword1: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
        newPassword2: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
      },
      {
        validator: UpdatePasswordValidator.matchNewPasswords,
      },
    );
  }

  updatePassword() {
    this.isLoading = true;
    const ctrls = this.form.controls;
    const credentials: Credentials = JSON.parse(sessionStorage.getItem('climbers-soul-caiarosio-temp-credentials')!);
    const remember: boolean = sessionStorage.getItem('climbers-soul-caiarosio-temp-remember')! == 'true';
    this.userService
      .updatePassword(credentials.username, ctrls['oldPassword'].value, ctrls['newPassword1'].value)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.credentialsService.setCredentials(credentials, remember);
          const redirectUrl: string = this.route.snapshot.queryParams['redirect'] || '/';
          this.router.navigate([redirectUrl], { replaceUrl: true });
        },
        error: () => {
          this.snackBar.open("C'è stato un errore durante l'aggiornamento della password'", 'Chiudi', {
            duration: 10000,
          });
        },
      });
  }

  get pwdMinLength(): number {
    return passwordMinLength;
  }
}
