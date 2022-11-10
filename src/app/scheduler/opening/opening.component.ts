import { Component, Input, OnInit } from '@angular/core';
import { Opening } from '@app/@shared/models/opening.model';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
})
export class OpeningComponent implements OnInit {
  @Input() opening: Opening;

  constructor() {}

  ngOnInit(): void {}

  get spaceAvaiable(): boolean {
    return this.opening.reservations.length < 4;
  }

  get spaceAlmostFull(): boolean {
    return this.opening.reservations.length >= 4 && this.opening.reservations.length < 8;
  }

  get spaceFull(): boolean {
    return this.opening.reservations.length >= 8;
  }
}
