import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { OpeningModule } from '@app/opening/opening.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent],
  imports: [CommonModule, SharedModule, MaterialModule, SchedulerRoutingModule, OpeningModule],
})
export class SchedulerModule {}
