import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';

@NgModule({
  declarations: [RulesComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, RulesRoutingModule],
})
export class RulesModule {}
