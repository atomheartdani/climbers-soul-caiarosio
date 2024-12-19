import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-faq',
  templateUrl: './about-faq.component.html',
  styleUrl: './about-faq.component.scss',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
})
export class AboutFaqComponent {
  get seasonYear(): number {
    const today: Date = new Date();

    if (today.getMonth() >= 8) {
      return today.getFullYear() + 1;
    } else {
      return today.getFullYear();
    }
  }
}
