import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MaterialModule, AuthRoutingModule],
  declarations: [LoginComponent, UpdatePasswordComponent],
})
export class AuthModule {}
