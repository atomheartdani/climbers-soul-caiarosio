import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-location',
  templateUrl: './about-location.component.html',
  styleUrl: './about-location.component.scss',
  imports: [MatCardModule, MatIconModule],
})
export class AboutLocationComponent {}
