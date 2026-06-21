import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchNewPasswordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword1 = control.get('newPassword1')?.value;
    const newPassword2 = control.get('newPassword2')?.value;

    if (newPassword1 && newPassword2 && newPassword1 !== newPassword2) {
      return { passwordsDontMatch: true };
    }
    return null;
  };
}
