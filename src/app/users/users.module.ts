import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, UserDetailDialogComponent, UserListComponent],
  imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, UsersRoutingModule],
})
export class UsersModule {}
