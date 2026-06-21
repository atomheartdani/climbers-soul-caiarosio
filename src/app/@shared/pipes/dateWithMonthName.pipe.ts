import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithMonthName',
})
export class DateWithMonthNamePipe implements PipeTransform {
  transform(value: string): string {
    let year: string = '';
    let month: string = value;

    if (DateWithMonthNamePipe.isValidDate(value)) {
      const splitted: string[] = value.split('-');
      year = ' - ' + splitted[0];
      month = splitted[1];
    }

    return DateWithMonthNamePipe.toMonthNameDate(year, month);
  }

  private static isValidDate(value: string): boolean {
    // check if it's a date in the yyyy-mm-dd format
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return true;
    }

    // check if it's a date in the yyyy-mm format
    if (/^\d{4}-\d{2}$/.test(value)) {
      return true;
    }

    return false;
  }

  private static toMonthNameDate(year: string, month: string): string {
    switch (month) {
      case '01': {
        return 'Gennaio' + year;
      }
      case '02': {
        return 'Febbraio' + year;
      }
      case '03': {
        return 'Marzo' + year;
      }
      case '04': {
        return 'Aprile' + year;
      }
      case '05': {
        return 'Maggio' + year;
      }
      case '06': {
        return 'Giugno' + year;
      }
      case '07': {
        return 'Luglio' + year;
      }
      case '08': {
        return 'Agosto' + year;
      }
      case '09': {
        return 'Settembre' + year;
      }
      case '10': {
        return 'Ottobre' + year;
      }
      case '11': {
        return 'Novembre' + year;
      }
      case '12': {
        return 'Dicembre' + year;
      }
      default: {
        return '';
      }
    }
  }
}
