import { AbstractControl } from '@angular/forms';

export class UpdatePasswordValidator {
  static matchNewPasswords(control: AbstractControl) {
    let newPassword1 = control.get('newPassword1')!.value;
    let newPassword2 = control.get('newPassword2')!.value;
    if (newPassword1 && newPassword2 && newPassword1 !== newPassword2) {
      return { passwordsDontMatch: true };
    }
    return null;
  }
}
