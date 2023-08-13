import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesComponent } from './rules.component';

const routes: Routes = [{ path: '', component: RulesComponent, data: { title: 'Regolamento' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RulesRoutingModule {}
