import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@NgModule({
  declarations: [UsersComponent, UserDetailDialogComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, UsersRoutingModule],
})
export class UsersModule {}
