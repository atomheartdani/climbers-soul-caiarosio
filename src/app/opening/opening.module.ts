import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateWithDayNamePipe } from '@app/@shared/pipes/dateWithDayName.pipe';
import { MaterialModule } from '@app/material.module';
import { DeleteReservationDialogComponent } from './delete-reservation-dialog/delete-reservation-dialog.component';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';
import { OpeningDetailDialogComponent } from './opening-detail-dialog/opening-detail-dialog.component';
import { OpeningComponent } from './opening.component';

@NgModule({
  imports: [CommonModule, DateWithDayNamePipe, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [
    OpeningComponent,
    OpeningDetailDialogComponent,
    InsertReservationDialogComponent,
    DeleteReservationDialogComponent,
  ],
  exports: [OpeningComponent],
})
export class OpeningModule {}
