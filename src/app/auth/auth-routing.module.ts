import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'updatePassword', component: UpdatePasswordComponent, data: { title: 'Update Password' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
