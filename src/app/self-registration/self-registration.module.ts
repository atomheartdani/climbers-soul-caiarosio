import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SelfRegistrationRoutingModule } from './self-registration-routing.module';
import { SelfRegistrationComponent } from './self-registration.component';

@NgModule({
  declarations: [SelfRegistrationComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SelfRegistrationRoutingModule,
  ],
})
export class SelfRegistrationModule {}
