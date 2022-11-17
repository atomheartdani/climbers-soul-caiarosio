import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [{ path: '', component: SchedulerComponent, data: { title: marker('Scheduler') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SchedulerRoutingModule {}
