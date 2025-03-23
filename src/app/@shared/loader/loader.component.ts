import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [MatProgressSpinner],
})
export class LoaderComponent {
  @Input() isLoading = false;
  @Input() size = 1;
  @Input() message: string | undefined;
}
