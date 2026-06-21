import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from '@app/@shared/services/user.service';
import { catchError, map, Observable, of } from 'rxjs';

export function usernameValidator(): AsyncValidatorFn {
  const userService = inject(UserService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.touched) {
      return of(null);
    }

    return userService.checkUsername(control.value).pipe(
      map((isTaken: boolean) => (isTaken ? { usernameAlreadyExists: true } : null)),
      catchError(() => of(null)),
    );
  };
}
