import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '@app/@shared/loader/loader.component';
import { MaterialModule } from '@app/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  imports: [CommonModule, LoaderComponent, ReactiveFormsModule, MaterialModule, AuthRoutingModule],
  declarations: [LoginComponent, UpdatePasswordComponent],
})
export class AuthModule {}
