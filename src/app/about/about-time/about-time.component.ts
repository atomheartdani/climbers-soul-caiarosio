import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-time',
  templateUrl: './about-time.component.html',
  styleUrl: './about-time.component.scss',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
})
export class AboutTimeComponent {}
