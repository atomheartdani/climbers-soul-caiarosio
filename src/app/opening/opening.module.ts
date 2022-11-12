import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { OpeningComponent } from './opening.component';
import { InsertReservationDialogComponent } from './insert-reservation-dialog/insert-reservation-dialog.component';
import { OpeningDetailDialogComponent } from './opening-detail-dialog/opening-detail-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, ReactiveFormsModule],
  declarations: [OpeningComponent, InsertReservationDialogComponent, OpeningDetailDialogComponent],
  exports: [OpeningComponent],
})
export class OpeningModule {}
