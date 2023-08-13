import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [{ path: '', component: SchedulerComponent, data: { title: 'Calendario' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SchedulerRoutingModule {}
