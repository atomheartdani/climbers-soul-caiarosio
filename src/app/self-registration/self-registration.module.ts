import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { SelfRegistrationRoutingModule } from './self-registration-routing.module';
import { SelfRegistrationComponent } from './self-registration.component';

@NgModule({
  declarations: [SelfRegistrationComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SelfRegistrationRoutingModule,
  ],
})
export class SelfRegistrationModule {}
