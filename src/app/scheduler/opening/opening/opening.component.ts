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
}
