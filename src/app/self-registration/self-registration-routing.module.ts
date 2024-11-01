import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfRegistrationGuard } from '@app/@shared/guards/self-registration.guard';
import { SelfRegistrationComponent } from './self-registration.component';

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
