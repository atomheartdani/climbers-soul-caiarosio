import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({ name: 'userRbacAcronym' })
export class UserRbacAcronymPipe implements PipeTransform {
  transform(user: User): string {
    let ret = '';

    if (user.canManageOpenings) {
      ret += 'Calendario ';
    }

    if (user.canManageUsers) {
      ret += 'Utenti ';
    }

    return ret.trim();
  }
}
