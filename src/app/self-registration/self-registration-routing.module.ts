import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SelfRegistrationComponent } from './self-registration.component';

const routes: Routes = [{ path: '', component: SelfRegistrationComponent, data: { title: marker('Registrati') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SelfRegistrationRoutingModule {}
