import { Component } from '@angular/core';

@Component({
  selector: 'app-about-faq',
  templateUrl: './about-faq.component.html',
  styleUrl: './about-faq.component.scss',
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
