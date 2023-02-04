import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { RulesComponent } from './rules.component';

const routes: Routes = [{ path: '', component: RulesComponent, data: { title: marker('Rules') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RulesRoutingModule {}
