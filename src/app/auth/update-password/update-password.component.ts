import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '@app/@shared/loader/loader.component';
import { Credentials } from '@app/@shared/models/credentials.model';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { UserService } from '@app/@shared/services/user.service';
import { UpdatePasswordValidator } from '@app/@shared/validators/update-password.validator';
import { finalize } from 'rxjs';

const passwordMinLength: number = 12;

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  imports: [
    FormsModule,
    LoaderComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class UpdatePasswordComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);
  private credentialsService = inject(CredentialsService);

  form: FormGroup;
  isLoading = signal<boolean>(false);

  constructor() {
    this.form = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword1: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
        newPassword2: ['', [Validators.required, Validators.minLength(passwordMinLength)]],
      },
      {
        validators: UpdatePasswordValidator.matchNewPasswords,
      },
    );
  }

  updatePassword() {
    this.isLoading.set(true);
    const ctrls = this.form.controls;
    const credentials: Credentials = JSON.parse(sessionStorage.getItem('climbers-soul-caiarosio-temp-credentials')!);
    const remember: boolean = sessionStorage.getItem('climbers-soul-caiarosio-temp-remember')! == 'true';
    this.userService
      .updatePassword(credentials.username, ctrls['oldPassword'].value, ctrls['newPassword1'].value)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading.set(false);
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
