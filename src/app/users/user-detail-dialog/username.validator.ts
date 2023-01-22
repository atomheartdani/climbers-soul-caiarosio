import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '@app/@shared/services/user.service';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsername(control.value).pipe(
      map((isTaken: boolean) => (isTaken ? { usernameAlreadyExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
