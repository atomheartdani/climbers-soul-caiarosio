import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { OpeningModule } from '@app/opening/opening.module';
import { TranslateModule } from '@ngx-translate/core';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    SchedulerRoutingModule,
    OpeningModule,
  ],
})
export class SchedulerModule {}
