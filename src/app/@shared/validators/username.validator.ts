import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UserService } from '@app/@shared/services/user.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  private userService = inject(UserService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.touched) {
      return this.userService.checkUsername(control.value).pipe(
        map((isTaken: boolean) => (isTaken ? { usernameAlreadyExists: true } : null)),
        catchError(() => of(null)),
      );
    }
    return of(null);
  }
}
