import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateWithMonthName' })
export class DateWithMonthNamePipe implements PipeTransform {
  transform(value: string): string {
    const ISO_STRING_REGEX = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
    const PARTIAL_ISO_STRING_REGEX = new RegExp('^\\d{4}-\\d{2}$');

    let year = '';
    let month = value;
    if (ISO_STRING_REGEX.test(value) || PARTIAL_ISO_STRING_REGEX.test(value)) {
      let splitted = value.split('-');
      year = ' - ' + splitted[0];
      month = splitted[1];
    }

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
