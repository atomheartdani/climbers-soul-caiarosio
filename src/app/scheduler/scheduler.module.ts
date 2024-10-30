import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from '@app/@shared/loader/loader.component';
import { DateWithMonthNamePipe } from '@app/@shared/pipes/dateWithMonthName.pipe';
import { MaterialModule } from '@app/material.module';
import { OpeningModule } from '@app/opening/opening.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent],
  imports: [
    CommonModule,
    DateWithMonthNamePipe,
    LoaderComponent,
    MaterialModule,
    SchedulerRoutingModule,
    OpeningModule,
  ],
})
export class SchedulerModule {}
