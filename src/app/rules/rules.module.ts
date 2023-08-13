import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';

@NgModule({
  declarations: [RulesComponent],
  imports: [CommonModule, SharedModule, MaterialModule, RulesRoutingModule],
})
export class RulesModule {}
