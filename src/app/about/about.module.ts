import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { AboutFaqComponent } from './about-faq/about-faq.component';
import { AboutLocationComponent } from './about-location/about-location.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutSocialComponent } from './about-social/about-social.component';
import { AboutTimeComponent } from './about-time/about-time.component';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AboutRoutingModule],
  declarations: [AboutFaqComponent, AboutLocationComponent, AboutSocialComponent, AboutTimeComponent, AboutComponent],
})
export class AboutModule {}
