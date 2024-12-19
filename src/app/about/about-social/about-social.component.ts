import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-social',
  templateUrl: './about-social.component.html',
  styleUrl: './about-social.component.scss',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
})
export class AboutSocialComponent {}
