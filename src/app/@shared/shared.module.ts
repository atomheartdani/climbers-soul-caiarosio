import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { DateWithMonthNamePipe } from './pipes/dateWithMonthName.pipe';
import { UserRbacAcronymPipe } from './pipes/userRbacAcronym.pipe';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [DateWithMonthNamePipe, UserRbacAcronymPipe, LoaderComponent, ConfirmDialogComponent],
  exports: [DateWithMonthNamePipe, UserRbacAcronymPipe, LoaderComponent, ConfirmDialogComponent],
})
export class SharedModule {}
