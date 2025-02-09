import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  standalone: true,
})
export class WallComponent {
  @Input() imageUrl: string;
}
