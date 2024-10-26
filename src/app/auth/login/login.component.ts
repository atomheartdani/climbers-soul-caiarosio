import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error: string | undefined;
  form!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
  ) {
    this.createForm();
  }

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.form.value);
    login$
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (credentials) => {
          console.debug(`${credentials.username} successfully logged in`);
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
        },
        error: (e) => {
          console.debug(`Login error: ${e}`, e);
          this.error = e;
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
}
