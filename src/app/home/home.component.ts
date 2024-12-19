import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WallComponent } from './wall/wall.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatCardModule, WallComponent],
})
export class HomeComponent {}
