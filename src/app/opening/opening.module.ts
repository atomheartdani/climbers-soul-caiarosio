import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OpeningComponent } from './opening.component';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule],
  declarations: [OpeningComponent, InsertReservationDialogComponent],
  exports: [OpeningComponent],
})
export class OpeningModule {}
