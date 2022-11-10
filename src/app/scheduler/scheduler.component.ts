import { Component, OnInit } from '@angular/core';
import { Opening } from '@app/@shared/models/opening.model';
import { OpeningService } from '@app/@shared/services/opening.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  openings: Opening[] = [];
  isLoading: boolean = true;

  constructor(private openingService: OpeningService) {}

  ngOnInit(): void {
    this.openingService.getOpenings().subscribe((result) => {
      this.openings = result;
      this.isLoading = false;
    });
  }
}
