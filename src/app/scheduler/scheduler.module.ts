import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { OpeningComponent } from './opening/opening/opening.component';

@NgModule({
  declarations: [SchedulerComponent, OpeningComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, SchedulerRoutingModule],
})
export class SchedulerModule {}
