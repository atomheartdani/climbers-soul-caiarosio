import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithDayName',
})
export class DateWithDayNamePipe implements PipeTransform {
  transform(value: string): string {
    let weekday: number = -1;
    let day: number = 0;

    if (DateWithDayNamePipe.isValidDate(value)) {
      const date: Date = new Date(value);
      weekday = date.getDay();
      day = date.getDate();
    }

    return DateWithDayNamePipe.toDayNameDate(weekday, day, value);
  }

  private static isValidDate(value: string): boolean {
    // check if it's a date in the yyyy-mm-dd format
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return true;
    }

    return false;
  }

  private static toDayNameDate(weekday: number, day: number, originalValue: string): string {
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
        return originalValue;
      }
    }
  }
}
