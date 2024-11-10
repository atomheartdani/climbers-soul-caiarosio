import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithDayName',
  standalone: true,
})
export class DateWithDayNamePipe implements PipeTransform {
  transform(value: string): string {
    const ISO_STRING_REGEX = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');

    let weekday: number = -1;
    let day: number = 0;
    if (ISO_STRING_REGEX.test(value)) {
      const date = new Date(value);
      weekday = date.getDay();
      day = date.getDate();
    }

    switch (weekday) {
      case 0: {
        return 'Domenica ' + day;
      }
      case 1: {
        return 'Lunedì ' + day;
      }
      case 2: {
        return 'Martedì ' + day;
      }
      case 3: {
        return 'Mercoledì ' + day;
      }
      case 4: {
        return 'Giovedì ' + day;
      }
      case 5: {
        return 'Venerdì ' + day;
      }
      case 6: {
        return 'Sabato ' + day;
      }
      default: {
        return value;
      }
    }
  }
}
