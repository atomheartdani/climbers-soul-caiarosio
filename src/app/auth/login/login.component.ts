import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '@app/@shared/loader/loader.component';
import { Credentials } from '@app/@shared/models/credentials.model';
import { AuthenticationService } from '@app/@shared/services/authentication.service';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    LoaderComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private credentialsService = inject(CredentialsService);

  form!: FormGroup;
  hasError = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor() {
    this.createForm();
  }

  login() {
    this.isLoading.set(true);

    this.authenticationService
      .login(this.form.value)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (credentials) => {
          this.redirect(credentials);
        },
        error: () => {
          this.hasError.set(true);
        },
      });
  }

  private createForm() {
    const remember = this.credentialsService.isRemeberActive();

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: remember,
    });
  }

  private redirect(credentials: Credentials) {
    const redirectUrl: string = this.route.snapshot.queryParams['redirect'] || '/';
    const remember = this.form.controls['remember'].value;

    if (credentials.updatePassword) {
      sessionStorage.setItem('climbers-soul-caiarosio-temp-credentials', JSON.stringify(credentials));
      sessionStorage.setItem('climbers-soul-caiarosio-temp-remember', remember);

      this.router.navigate(['/updatePassword'], { queryParams: { redirect: redirectUrl }, replaceUrl: true });
    } else {
      this.credentialsService.setCredentials(credentials, remember);

      this.router.navigate([redirectUrl], { replaceUrl: true });
    }
  }
}
