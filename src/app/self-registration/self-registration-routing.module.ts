import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfRegistrationComponent } from './self-registration.component';
import { SelfRegistrationGuard } from './self-registration.guard';

const routes: Routes = [
  {
    path: '',
    component: SelfRegistrationComponent,
    data: { title: 'Registrati' },
    canActivate: [SelfRegistrationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SelfRegistrationGuard],
})
export class SelfRegistrationRoutingModule {}
