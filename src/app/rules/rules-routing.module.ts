import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { RulesComponent } from './rules.component';

const routes: Routes = [Shell.childRoutes([{ path: '', component: RulesComponent, data: { title: marker('Rules') } }])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RulesRoutingModule {}
