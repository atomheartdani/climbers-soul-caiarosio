import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class IsoDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      // The sv-SE locale prints out in YYYY-MM-DD format and ignores the timezone
      return date.toLocaleDateString('sv-SE');
    } else {
      return date.getFullYear().toString();
    }
  }
}
