import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { DateWithMonthNamePipe } from './pipes/dateWithMonthName.pipe';
import { UserRbacAcronymPipe } from './pipes/userRbacAcronym.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, TranslateModule, CommonModule],
  declarations: [DateWithMonthNamePipe, UserRbacAcronymPipe, LoaderComponent, ConfirmDialogComponent],
  exports: [DateWithMonthNamePipe, UserRbacAcronymPipe, LoaderComponent, ConfirmDialogComponent],
})
export class SharedModule {}
