import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRbacAcronymPipe } from '@app/@shared/pipes/userRbacAcronym.pipe';
import { MaterialModule } from '@app/material.module';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, UserDetailDialogComponent, UserListComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, UserRbacAcronymPipe, UsersRoutingModule],
})
export class UsersModule {}
