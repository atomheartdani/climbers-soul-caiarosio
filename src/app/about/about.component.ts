import { Component } from '@angular/core';
import { AboutLocationComponent } from './about-location/about-location.component';
import { AboutTimeComponent } from './about-time/about-time.component';
import { AboutSocialComponent } from './about-social/about-social.component';
import { AboutFaqComponent } from './about-faq/about-faq.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [AboutLocationComponent, AboutTimeComponent, AboutSocialComponent, AboutFaqComponent],
})
export class AboutComponent {}
