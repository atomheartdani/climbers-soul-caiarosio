import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@app/auth';
import { MaterialModule } from '@app/material.module';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AuthModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent],
})
export class ShellModule {}
