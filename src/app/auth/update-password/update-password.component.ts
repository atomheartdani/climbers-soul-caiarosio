import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@app/@shared/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { Credentials, CredentialsService } from '../credentials.service';
import { UpdatePasswordValidator } from './update-password.validator';

const passwordMinLength: number = 16;

@UntilDestroy()
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private credentialsService: CredentialsService
  ) {
    this.updatePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword1: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
        newPassword2: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
      },
      {
        validator: UpdatePasswordValidator.matchNewPasswords,
      }
    );
  }

  ngOnInit(): void {}

  updatePassword() {
    this.isLoading = true;
    let ctrls = this.updatePasswordForm.controls;
    let credentials: Credentials = JSON.parse(sessionStorage.getItem('climbers-soul-caiarosio-temp-credentials')!);
    let remember: boolean = sessionStorage.getItem('climbers-soul-caiarosio-temp-remember')! == 'true';
    this.userService
      .updatePassword(credentials.username, ctrls['oldPassword'].value, ctrls['newPassword1'].value)
      .pipe(
        finalize(() => {
          this.updatePasswordForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => {
          this.credentialsService.setCredentials(credentials, remember);
          let redirectUrl: string = this.route.snapshot.queryParams['redirect'] || '/';
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
