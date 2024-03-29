import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WallComponent } from './wall/wall.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent, WallComponent],
})
export class HomeModule {}
